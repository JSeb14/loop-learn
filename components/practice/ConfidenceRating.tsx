"use client";

export default function ConfidenceRating({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (value: number) => void;
}) {
  const handleRating = (value: number) => {
    setRating(value);
  };

  const ratings = [
    { value: 1, label: "Need Practice", color: "red" },
    { value: 2, label: "Uncertain", color: "orange" },
    { value: 3, label: "Okay", color: "yellow" },
    { value: 4, label: "Good", color: "green" },
    { value: 5, label: "Confident", color: "blue" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="text-center">
        <h3 className="text-base font-semibold text-foreground">
          How confident are you with this card?
        </h3>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            Less Confident
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            More Confident
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {ratings.map((item) => (
            <button
              key={item.value}
              onClick={() => handleRating(item.value)}
              className={`
                relative group p-3 rounded-lg border-2 transition-all duration-200 text-center space-y-1
                ${
                  rating === item.value
                    ? getActiveStyles(item.color)
                    : "border-border bg-background hover:border-primary/30 hover:bg-secondary/30"
                }
              `}
            >
              <div
                className={`text-lg font-bold transition-colors duration-200 ${
                  rating === item.value
                    ? "text-white"
                    : "text-foreground group-hover:text-primary"
                }`}
              >
                {item.value}
              </div>

              <div
                className={`text-[11px] font-medium transition-colors duration-200 ${
                  rating === item.value
                    ? "text-white/90"
                    : "text-muted-foreground group-hover:text-primary"
                }`}
              >
                {item.label}
              </div>

              {rating === item.value && (
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full shadow-md flex items-center justify-center">
                  <div className="w-1 h-1 bg-current rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-1">
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full transition-all duration-300 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"
              style={{ width: `${(rating / 5) * 100}%` }}
            />
          </div>
          <div className="text-center">
            <span className="text-[12px] text-muted-foreground">
              {rating > 0
                ? `${rating}/5 - ${ratings[rating - 1].label}`
                : "Select your confidence level"}
            </span>
          </div>
        </div>
      </div>

      {rating > 0 && (
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] ${getContextStyles(
              ratings[rating - 1].color
            )}`}
          >
            <div className="w-1 h-1 rounded-full bg-current" />
            {getConfidenceMessage(rating)}
          </div>
        </div>
      )}
    </div>
  );
}

function getActiveStyles(color: string) {
  switch (color) {
    case "red":
      return "border-red-500 bg-red-500 shadow-lg shadow-red-500/25";
    case "orange":
      return "border-orange-500 bg-orange-500 shadow-lg shadow-orange-500/25";
    case "yellow":
      return "border-yellow-500 bg-yellow-500 shadow-lg shadow-yellow-500/25";
    case "green":
      return "border-green-500 bg-green-500 shadow-lg shadow-green-500/25";
    case "blue":
      return "border-blue-500 bg-blue-500 shadow-lg shadow-blue-500/25";
    default:
      return "border-primary bg-primary shadow-lg shadow-primary/25";
  }
}

function getContextStyles(color: string) {
  switch (color) {
    case "red":
      return "bg-red-500/10 text-red-600";
    case "orange":
      return "bg-orange-500/10 text-orange-600";
    case "yellow":
      return "bg-yellow-500/10 text-yellow-600";
    case "green":
      return "bg-green-500/10 text-green-600";
    case "blue":
      return "bg-blue-500/10 text-blue-600";
    default:
      return "bg-primary/10 text-primary";
  }
}

function getConfidenceMessage(rating: number) {
  switch (rating) {
    case 1:
      return "This card will appear more frequently";
    case 2:
      return "We'll review this card soon";
    case 3:
      return "Good progress, keep practicing";
    case 4:
      return "Well done! You're getting there";
    case 5:
      return "Excellent! This card is mastered";
    default:
      return "";
  }
}
