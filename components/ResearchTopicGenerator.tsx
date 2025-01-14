'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function ResearchTopicGenerator() {
  const [field, setField] = useState<string>('')
  const [topic, setTopic] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const generateTopic = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field }),
      });
      const data = await response.json();
      if (response.ok) {
        setTopic(data.topic);
      } else {
        throw new Error(data.error || 'Failed to generate topic');
      }
    } catch (error) {
      console.error('Error generating topic:', error);
      toast({
        title: "Error",
        description: "Failed to generate topic. Please try again.",
        variant: "destructive",
      });
      setTopic('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>AI Research Topic Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter a scientific field"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
          <Button onClick={generateTopic} disabled={isLoading || !field}>
            {isLoading ? 'Generating...' : 'Generate Topic'}
          </Button>
          {topic && (
            <p className="mt-4 text-sm">
              Suggested Research Topic: <strong>{topic}</strong>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

