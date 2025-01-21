"use client"

import type React from "react"
import { useRef, useEffect, useState, Suspense } from "react"
import * as d3 from "d3"
import { ErrorBoundary } from "react-error-boundary"

interface Node extends d3.SimulationNodeDatum {
  id: string
  group: number
  category:
    | "concept"
    | "researcher"
    | "institution"
    | "topic"
    | "scientific_term"
    | "industry"
    | "enthusiast"
    | "academic_institute"
  subject?: string
}

interface Link extends d3.SimulationLinkDatum<Node> {
  value: number
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="text-center p-6 bg-red-100 text-red-700">
      <h2 className="text-lg font-bold mb-2">Error in Knowledge Graph</h2>
      <p>{error.message}</p>
    </div>
  )
}

function LoadingFallback() {
  return <div className="text-center p-6">Loading Knowledge Graph...</div>
}

const KnowledgeGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect()
        setDimensions({
          width: Math.min(width, window.innerWidth),
          height: height,
        })
      }
    }

    window.addEventListener("resize", updateDimensions)
    updateDimensions()
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (!svgRef.current || !dimensions.width || !dimensions.height) return

    try {
      const svg = d3.select(svgRef.current)
      svg.selectAll("*").remove()

      const width = dimensions.width
      const height = dimensions.height

      // Scientific terms to add
      const scientificTerms = [
        "Photosynthesis",
        "Mitochondria",
        "Evolution",
        "Quantum",
        "Hypothesis",
        "Gravity",
        "Atom",
        "Neuroscience",
        "Ecosystem",
        "DNA",
        "Entropy",
        "Genome",
        "Isotope",
        "Catalyst",
        "Neuron",
        "Tectonic",
        "Oxidation",
        "Cryogenics",
        "Thermodynamics",
        "Relativity",
        "Protein",
        "Fusion",
        "Fission",
        "Chromosome",
        "Molecule",
        "Nanotechnology",
        "Bioinformatics",
        "Spectroscopy",
        "Algorithm",
        "Symbiosis",
        "Epigenetics",
        "Quantum Entanglement",
        "Dark Matter",
        "Superconductivity",
        "Artificial Intelligence",
        "Machine Learning",
        "Blockchain",
        "CRISPR",
        "Stem Cells",
        "Renewable Energy",
      ]

      const specialNodes = [
        { id: "academic-institutes", subject: "Academic Institutes", category: "academic_institute" },
        { id: "researchers", subject: "Researchers", category: "researcher" },
        { id: "industries", subject: "Industries", category: "industry" },
        { id: "enthusiasts", subject: "Enthusiasts", category: "enthusiast" },
      ]

      // Generate nodes
      const nodes: Node[] = [
        ...specialNodes,
        ...Array.from({ length: 96 }, (_, i) => ({
          id: `node-${i}`,
          group: Math.floor(Math.random() * 8),
          category: ["concept", "researcher", "institution", "topic", "industry", "enthusiast", "academic_institute"][
            Math.floor(Math.random() * 7)
          ] as Node["category"],
        })),
        ...scientificTerms.map((term, i) => ({
          id: `scientific-term-${i}`,
          group: 8,
          category: "scientific_term" as Node["category"],
          subject: term,
        })),
      ]

      // Generate links
      const links: Link[] = []
      nodes.forEach((node, i) => {
        const numLinks = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < numLinks; j++) {
          const target = Math.floor(Math.random() * nodes.length)
          if (target !== i) {
            links.push({
              source: node.id,
              target: nodes[target].id,
              value: Math.random(),
            })
          }
        }
      })

      // Color scale based on the image
      const color = d3
        .scaleOrdinal<string>()
        .domain([
          "concept",
          "researcher",
          "institution",
          "topic",
          "scientific_term",
          "industry",
          "enthusiast",
          "academic_institute",
        ])
        .range(["#ffb7eb", "#40e0d0", "#ffa07a", "#98fb98", "#ff6b6b", "#87CEFA", "#FFD700", "#9370DB"])

      // Force simulation setup
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink<Node, Link>(links)
            .id((d) => d.id)
            .distance((d) => Math.min(width, height) * 0.1),
        )
        .force("charge", d3.forceManyBody().strength(-Math.min(width, height) * 0.5))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force(
          "collision",
          d3.forceCollide().radius((d) => {
            if (specialNodes.some((n) => n.id === d.id)) return Math.min(width, height) * 0.05
            return d.category === "scientific_term" ? Math.min(width, height) * 0.04 : Math.min(width, height) * 0.02
          }),
        )

      // Create container for graph
      const g = svg.append("g")

      // Draw links
      const link = g
        .append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#ffffff")
        .attr("stroke-opacity", 0.2)
        .attr("stroke-width", 0.5)

      // Draw nodes
      const node = g.append("g").selectAll("g").data(nodes).join("g").call(drag(simulation))

      node
        .append("circle")
        .attr("r", (d) => {
          const baseSize = Math.min(width, height) * 0.015
          if (specialNodes.some((n) => n.id === d.id)) return baseSize * 2
          switch (d.category) {
            case "scientific_term":
              return baseSize * 2.5
            case "researcher":
            case "industry":
            case "enthusiast":
            case "academic_institute":
              return baseSize * 1.5
            default:
              return baseSize
          }
        })
        .attr("fill", (d) => color(d.category))
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)

      // Add labels for special nodes and scientific terms
      node
        .filter((d) => specialNodes.some((n) => n.id === d.id) || d.category === "scientific_term")
        .append("text")
        .text((d) => d.subject)
        .attr("x", 0)
        .attr("y", (d) => (specialNodes.some((n) => n.id === d.id) ? 20 : 5))
        .attr("text-anchor", "middle")
        .attr("font-size", (d) =>
          specialNodes.some((n) => n.id === d.id)
            ? `${Math.min(width, height) * 0.02}px`
            : `${Math.min(width, height) * 0.015}px`,
        )
        .attr("font-weight", "bold")
        .attr("fill", "#ffffff")

      // Add hover effects
      node
        .on("mouseover", function (event, d) {
          d3.select(this)
            .select("circle")
            .transition()
            .duration(200)
            .attr("r", (d) => {
              const baseSize = Math.min(width, height) * 0.015
              if (specialNodes.some((n) => n.id === d.id)) return baseSize * 2.5
              switch (d.category) {
                case "scientific_term":
                  return baseSize * 3
                case "researcher":
                case "industry":
                case "enthusiast":
                case "academic_institute":
                  return baseSize * 2
                default:
                  return baseSize * 1.5
              }
            })
            .attr("stroke-width", 2)
        })
        .on("mouseout", function (event, d) {
          d3.select(this)
            .select("circle")
            .transition()
            .duration(200)
            .attr("r", (d) => {
              const baseSize = Math.min(width, height) * 0.015
              if (specialNodes.some((n) => n.id === d.id)) return baseSize * 2
              switch (d.category) {
                case "scientific_term":
                  return baseSize * 2.5
                case "researcher":
                case "industry":
                case "enthusiast":
                case "academic_institute":
                  return baseSize * 1.5
                default:
                  return baseSize
              }
            })
            .attr("stroke-width", 0.5)
        })

      // Add click selection
      node.on("click", function (event, d) {
        const isSelected = d3.select(this).classed("selected")

        // Reset all nodes and links
        node.classed("selected", false).select("circle").attr("stroke-width", 0.5)
        link.attr("stroke-opacity", 0.2)

        if (!isSelected) {
          // Highlight selected node and its connections
          d3.select(this).classed("selected", true).select("circle").attr("stroke-width", 2)

          link.attr("stroke-opacity", (l) => (l.source.id === d.id || l.target.id === d.id ? 0.8 : 0.1))
        }
      })

      // Update positions on each tick
      simulation.on("tick", () => {
        link
          .attr("x1", (d) => (d.source as Node).x!)
          .attr("y1", (d) => (d.source as Node).y!)
          .attr("x2", (d) => (d.target as Node).x!)
          .attr("y2", (d) => (d.target as Node).y!)

        node.attr("transform", (d) => `translate(${d.x},${d.y})`)
      })

      // Add glow effect
      const defs = svg.append("defs")
      const filter = defs.append("filter").attr("id", "glow")

      filter.append("feGaussianBlur").attr("stdDeviation", "3.5").attr("result", "coloredBlur")

      const feMerge = filter.append("feMerge")
      feMerge.append("feMergeNode").attr("in", "coloredBlur")
      feMerge.append("feMergeNode").attr("in", "SourceGraphic")

      // Apply glow to nodes
      node.style("filter", "url(#glow)")

      return () => {
        simulation.stop()
      }
    } catch (err) {
      console.error("Error in KnowledgeGraph:", err)
      setError("An error occurred while rendering the graph.")
    }
  }, [dimensions])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ background: "black" }}
    />
  )
}

// Drag behavior
function drag(simulation: d3.Simulation<Node, undefined>) {
  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  function dragged(event: any) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }

  return d3.drag<SVGGElement, Node>().on("start", dragstarted).on("drag", dragged).on("end", dragended)
}

export default function KnowledgeGraphWithErrorBoundary() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <KnowledgeGraph />
      </Suspense>
    </ErrorBoundary>
  )
}

