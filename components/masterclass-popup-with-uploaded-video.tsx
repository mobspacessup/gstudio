"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function MasterclassPopupWithVideo() {
  const [isOpen, setIsOpen] = useState(false)

  // Replace this with your uploaded video URL
  const videoUrl = "https://your-blob-url.vercel-storage.com/your-video.mp4"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[95vh] p-0 overflow-hidden">
        <div className="relative">
          {/* Video Section */}
          <div className="relative bg-black">
            <div className="aspect-[9/16] relative overflow-hidden w-full max-w-[400px] mx-auto">
              <video
                src={videoUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                poster="/video-thumbnail.jpg" // Optional thumbnail
              >
                <source src={videoUrl} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
          </div>

          {/* Rest of your popup content */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
