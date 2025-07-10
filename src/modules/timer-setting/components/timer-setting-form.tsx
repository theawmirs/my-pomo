"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus, Timer, Coffee, CoffeeIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import useTimerSetting from "../hooks/useTimerSetting";

export function TimerSettingForm() {
  const { timerConfig, handleIncreaseTimer, handleDecreaseTimer, handleSubmit, handleCancel } = useTimerSetting();
  const timerCards = [
    {
      title: "Focus Timer",
      description: "Concentrate on your tasks",
      type: "focus" as const,
      value: timerConfig.focus,
      icon: <Timer className="h-5 w-5" />,
      color: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      title: "Short Break",
      description: "Take a quick breather",
      type: "shortBreak" as const,
      value: timerConfig.shortBreak,
      icon: <Coffee className="h-5 w-5" />,
      color: "bg-green-500/10",
      textColor: "text-green-500",
    },
    {
      title: "Long Break",
      description: "Recharge properly",
      type: "longBreak" as const,
      value: timerConfig.longBreak,
      icon: <CoffeeIcon className="h-5 w-5" />,
      color: "bg-blue-500/10",
      textColor: "text-blue-500",
    },
  ];

  return (
    <div className="space-y-6">
      {timerCards.map((timer) => (
        <Card key={timer.type} className="p-4 border border-border/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${timer.color}`}>
                <div className={timer.textColor}>{timer.icon}</div>
              </div>
              <div>
                <h3 className="font-medium">{timer.title}</h3>
                <p className="text-sm text-muted-foreground">{timer.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleDecreaseTimer(timer.type)}
                disabled={timer.value <= 5}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>

              <div className="w-12 text-center">
                <span className="text-lg font-medium">{timer.value}</span>
                <span className="text-xs text-muted-foreground block">min</span>
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => handleIncreaseTimer(timer.type)}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
