import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import "./circular_progress.css";

export function StatCard() {
  return (
    <Card className="max-w-[350px]">
      <CardContent>
        <div className="prbr-cl p-2 mt-2" data-num="80%" style={{"--prcnt":80, "--clr": "#ffffff", "--bg": "#09090b;"} as React.CSSProperties}>
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="prbr-cl-bg"/>

                <circle cx="50" cy="50" r="45" className="prbr-cl-fill"/>
            </svg>
        </div>

        <p className="text-xl text-center tracking-wide">You were wrong <span className="text-3xl text-destructive">12</span> times.</p>
        <p className="text-xl text-center tracking-wide">You were correct <span className="text-3xl text-green-900">32</span> times.</p>

      </CardContent>
    </Card>
  )
}