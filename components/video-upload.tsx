"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VideoUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploading(true)
    setError(null)
    setProgress(0)

    const formData = new FormData(e.currentTarget)
    const file = formData.get("video") as File

    if (!file) {
      setError("Пожалуйста, выберите видео файл")
      setUploading(false)
      return
    }

    // Check file size (max 100MB for example)
    if (file.size > 100 * 1024 * 1024) {
      setError("Файл слишком большой. Максимальный размер: 100MB")
      setUploading(false)
      return
    }

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error("Ошибка загрузки видео")
      }

      const result = await response.json()
      setVideoUrl(result.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Загрузить видео</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <Label htmlFor="video">Выберите видео файл</Label>
          <Input id="video" name="video" type="file" accept="video/*" required disabled={uploading} />
        </div>

        {uploading && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground">Загрузка... {progress}%</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {videoUrl && (
          <Alert>
            <AlertDescription>Видео успешно загружено! URL: {videoUrl}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={uploading} className="w-full">
          {uploading ? "Загрузка..." : "Загрузить видео"}
        </Button>
      </form>

      {videoUrl && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Предварительный просмотр:</h3>
          <video src={videoUrl} controls className="w-full rounded-lg" style={{ maxHeight: "300px" }}>
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      )}
    </div>
  )
}
