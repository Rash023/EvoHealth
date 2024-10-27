import { useState, useEffect, useRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Skeleton } from "@/components/ui/skeleton";
import Typewriter from "typewriter-effect";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/Sidebar/Sidebar";

interface Message {
  query: string;
  response: string;
  isLoading?: boolean;
  isTypingFinished?: boolean; 
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Array<Message>>([
    { query: "", response: "Welcome to evoHealth!" },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const placeholders = [
    "What are the symptoms of seasonal allergies?",
    "How can I manage stress effectively?",
    "What should I do if I have a persistent cough?",
    "How can I improve my sleep quality?",
    "What are some home remedies for a sore throat?",
    "How can I boost my immune system naturally?",
  ];

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
          </div>
        </header>
        <main className="flex flex-col flex-grow p-4 overflow-hidden">
          <div
            className="flex flex-col h-full w-full md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto flex-grow overflow-y-auto p-1"
            ref={scrollAreaRef}
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="last:mb-0">
                  <div className="flex items-start justify-end">
                    <div className="flex-grow text-right">
                      <p className="text-sm">{message.query}</p>
                    </div>
                  </div>
                  <div className="flex items-start mb-4 mt-1">
                    <Avatar className="mr-4">
                      <AvatarImage src="/ai-avatar.png" alt="dh" />
                      <AvatarFallback>eH</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow mt-2" style={{ maxWidth: "70%" }}>
                      {message.isLoading ? (
                        <>
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[290px] mt-1" />
                        </>
                      ) : index === messages.length - 1 &&
                        !message.isTypingFinished ? (
                        <Typewriter
                          onInit={(typewriter) => {
                            typewriter
                              .typeString(message.response)
                              .callFunction(() => {
                                setMessages((prevMessages) => {
                                  const newMessages = [...prevMessages];
                                  const lastMessage =
                                    newMessages[newMessages.length - 1];
                                  lastMessage.isTypingFinished = true;
                                  return newMessages;
                                });
                              })
                              .pauseFor(500)
                              .start();
                          }}
                          options={{
                            delay: 2,
                          }}
                        />
                      ) : (
                        <div className="text-sm">{message.response}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <div className="p-4">
          <PlaceholdersAndVanishInput placeholders={placeholders} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
