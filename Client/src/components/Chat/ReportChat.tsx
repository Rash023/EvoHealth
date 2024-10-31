import { useState, useEffect, useRef } from "react";
import axios from "axios";
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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

interface Message {
  query: string;
  response: string;
  isLoading?: boolean;
  isTypingFinished?: boolean;
}

export const ReportChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<Message>>([
    { query: "", response: "Welcome to evoLens!" },
  ]);
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* UPLOAD FILE */
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files?.length) return;
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      toast.loading("Uploading file");
      const response = await axios.post(
        `${backEndUrl}/model/el/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload Response:", response);
      if (response.status === 200) {
        setUploadedFileInfo(response.data.response.file);
        toast.success("Successfully uploaded file");
      } else {
        throw new Error("Failed to upload files.");
      }
    } catch (error) {
      console.error("Upload Error - ", error);
      toast.error("Failed to upload file", {
        description: "Please try again!",
      });
    } finally {
      toast.dismiss();
    }
  };

  /* QUERY MODEL */
  /* QUERY MODEL */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget.querySelector("input")?.value;
    if (!query) return;
    if (!uploadedFileInfo) {
      toast.error("Please upload a file");
      return;
    }

    setMessages((prev) => [
      ...prev,
      { query, response: "", isLoading: true, isTypingFinished: false },
    ]);

    try {
      const response = await axios.post(`${backEndUrl}/model/el/query`, {
        query,
        fileInfo: uploadedFileInfo,
      });

      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        lastMessage.response = response.data.response;
        lastMessage.isLoading = false;
        return newMessages;
      });
    } catch (error) {
      console.error("Query Error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        lastMessage.response =
          "An error occurred while processing your request.";
        lastMessage.isLoading = false;
        return newMessages;
      });
    }
  };

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
                  {message.query && (
                    <div className="flex items-start justify-end mb-2">
                      <div
                        className="message-box bg-gray-700 p-4 rounded-lg shadow-md text-right"
                        style={{ maxWidth: "70%" }}
                      >
                        <p className="text-sm">{message.query}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start mb-4">
                    <Avatar className="mr-4">
                      <AvatarImage src="/ai-avatar.png" alt="AI Avatar" />
                      <AvatarFallback>eL</AvatarFallback>
                    </Avatar>
                    <div
                      className="message-box bg-gray-700 p-4 rounded-lg shadow-md"
                      style={{ maxWidth: "70%" }}
                    >
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
                                setMessages((prev) => {
                                  const newMessages = [...prev];
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
                        <ReactMarkdown
                          className="text-sm"
                          remarkPlugins={[remarkGfm]}
                        >
                          {message.response}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.txt,.doc,.docx"
              multiple
            />
            <div className="flex-1 relative">
              <PlaceholdersAndVanishInput
                fileInputRef={fileInputRef}
                placeholders={[]}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ReportChat;
