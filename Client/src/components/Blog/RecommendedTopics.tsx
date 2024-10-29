import { Button } from "../ui/button";

export const RecommendedTopics = () => (
  <div className="space-y-4">
    <h2 className="font-semibold">Recommended topics</h2>
    <div className="flex flex-wrap gap-2">
      {[
        "Data Science",
        "Self Improvement",
        "Writing",
        "Relationships",
        "Cryptocurrency",
        "Productivity",
        "Machine Learning",
      ].map((topic) => (
        <Button
          key={topic}
          variant="secondary"
          size="sm"
          className="rounded-full"
        >
          {topic}
        </Button>
      ))}
    </div>
  </div>
);
