'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

interface Node extends d3.SimulationNodeDatum {
  id: string
  group: number
  size: number
  type: 'major' | 'minor'
  label: string
  description?: string
}

interface Link extends d3.SimulationLinkDatum<Node> {
  value: number
}

const KnowledgeGraph: React.FC<{ onNodeClick: (node: Node) => void }> = ({ onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions()
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!svgRef.current || !dimensions.width || !dimensions.height) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove() // Clear previous render

    const width = dimensions.width
    const height = dimensions.height

    // Generate data
    const nodes: Node[] = [
      { id: 'hub0', group: 0, size: 2.5, type: 'major', label: 'Quantum Mechanics', description: 'The fundamental theory of nature at the smallest scales of energy levels of atoms and subatomic particles.' },
      { id: 'hub1', group: 1, size: 2.5, type: 'major', label: 'Molecular Biology', description: 'The branch of biology that deals with the structure and function of the macromolecules essential to life.' },
      { id: 'hub2', group: 2, size: 2.5, type: 'major', label: 'Astrophysics', description: 'The branch of astronomy that deals with the physics of the universe, including the physical properties of celestial objects.' },
      { id: 'hub3', group: 3, size: 2.5, type: 'major', label: 'Neuroscience', description: 'The scientific study of the nervous system and brain, including their structure, function, and disorders.' },
      { id: 'hub4', group: 4, size: 2.5, type: 'major', label: 'Climate Science', description: 'The study of the Earth\'s climate system and how it changes over time, including the effects of human activities.' },
      ...Array.from({ length: isMobile ? 20 : 50 }, (_, i) => ({
        id: `node${i}`,
        group: Math.floor(Math.random() * 5),
        size: 1 + Math.random() * 0.5,
        type: 'minor' as const,
        label: getRandomScientificTerm()
      }))
    ]

    const links: Link[] = []
    nodes.forEach((node, i) => {
      if (node.type === 'minor') {
        const numLinks = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < numLinks; j++) {
          links.push({
            source: node.id,
            target: nodes[Math.floor(Math.random() * nodes.length)].id,
            value: Math.random()
          })
        }
      }
    })

    const color = d3.scaleOrdinal(["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"])

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => (d as Node).size * 5 + 2))

    const link = svg.append("g")
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.value))
      .attr("fill", "none")

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", d => d.size * 5)
      .attr("fill", d => color(d.group.toString()))
      .call(drag(simulation))
      .on("click", (event, d) => {
        setSelectedNode(d.id)
        onNodeClick(d)
      })
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(300)
          .attr("r", d => d.size * 7)
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
      })
      .on("mouseout", function(event, d) {
        d3.select(this)
          .transition()
          .duration(300)
          .attr("r", d => d.size * 5)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
      })

    const label = svg.append("g")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.type === 'major' ? d.label : '')
      .attr("font-size", "10px")
      .attr("fill", "white")
      .style("pointer-events", "none")

    simulation.on("tick", () => {
      link.attr("d", d => {
        const dx = (d.target as Node).x! - (d.source as Node).x!,
              dy = (d.target as Node).y! - (d.source as Node).y!,
              dr = Math.sqrt(dx * dx + dy * dy);
        return `M${(d.source as Node).x!},${(d.source as Node).y!}A${dr},${dr} 0 0,1 ${(d.target as Node).x!},${(d.target as Node).y!}`;
      })

      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!)

      label
        .attr("x", d => (d as Node).x!)
        .attr("y", d => (d as Node).y! + 15)
    })

    function pulseNodes() {
      node
        .transition()
        .duration(1500)
        .attr("r", d => d.size * 5)
        .transition()
        .duration(1500)
        .attr("r", d => d.size * 5 + 2)
        .on("end", pulseNodes)
    }

    pulseNodes()

    // Blinking effect for selected node
    function blinkSelectedNode() {
      if (selectedNode) {
        node.filter(d => d.id === selectedNode)
          .transition()
          .duration(500)
          .attr("fill", "white")
          .transition()
          .duration(500)
          .attr("fill", d => color(d.group.toString()))
          .on("end", blinkSelectedNode)
      }
    }

    blinkSelectedNode()

    return () => {
      simulation.stop()
    }
  }, [dimensions, isMobile, onNodeClick, selectedNode])

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  )
}

function getRandomScientificTerm() {
  const terms = [
    'Photosynthesis', 'Mitochondria', 'Entropy', 'Relativity', 'Genome',
    'Neuron', 'Quark', 'Enzyme', 'Fusion', 'Ecosystem', 'Protein',
    'Gravity', 'Electron', 'Chromosome', 'Catalyst', 'Nebula', 'Synapse',
    'Isotope', 'Molecule', 'Thermodynamics', 'Photon', 'Nucleus', 'Atom',
    'Bacteria', 'Fossil', 'Wavelength', 'Mutation', 'Tectonics', 'Osmosis',
    'Quantum', 'Proton', 'Neutron', 'Cytoplasm', 'Magnetism', 'Velocity',
    'Higgs Boson', 'Dark Matter', 'Epigenetics', 'Nanotechnology', 'CRISPR',
    'Artificial Intelligence', 'Machine Learning', 'Quantum Computing',
    'Stem Cells', 'Genetic Engineering', 'Superconductivity', 'Blockchain',
    'Bioinformatics', 'Neuroplasticity', 'Exoplanet', 'Gravitational Waves',
    'Antibiotic Resistance', 'Renewable Energy', 'Particle Accelerator',
    'Gene Therapy', 'Immunotherapy', 'Quantum Entanglement', 'Neural Networks',
    'Bioengineering', 'Synthetic Biology', 'Quantum Cryptography'
  ]
  return terms[Math.floor(Math.random() * terms.length)]
}

function drag(simulation: d3.Simulation<Node, undefined>) {
  function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }

  return d3.drag<SVGCircleElement, Node>()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
}

export default KnowledgeGraph

