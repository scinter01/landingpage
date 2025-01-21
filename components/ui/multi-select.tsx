"use client"

import * as React from "react"
import { X } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type OptionType = {
  label: string
  value: string
}

type MultiSelectProps = {
  options: OptionType[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({ options, selected, onChange, placeholder, className }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between min-h-[2.5rem] h-auto",
            "bg-white/10 border-white/20 text-white hover:bg-white/20",
            "flex flex-wrap gap-1 py-2",
            className
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              selected.map((item) => (
                <Badge
                  key={item}
                  className="bg-purple-600/50 text-white hover:bg-purple-600/75"
                >
                  {options.find((option) => option.value === item)?.label}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-white hover:text-white/80" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
          <span className="shrink-0 opacity-50 text-white">+</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-gray-800/95 backdrop-blur-xl border-white/20">
        <Command className="bg-transparent">
          <CommandInput placeholder="Search..." className="text-white placeholder:text-gray-400" />
          <CommandEmpty className="text-gray-400">No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    selected.includes(option.value)
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value]
                  )
                  setOpen(true)
                }}
                className="text-white hover:bg-white/10"
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-white/20",
                    selected.includes(option.value)
                      ? "bg-purple-600 text-white"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <X className={cn("h-4 w-4")} />
                </div>
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

