import { Atom, Rocket, Users, Globe } from 'lucide-react'

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {[
        {
          icon: Atom,
          title: "STEM Education",
          description: "Advancing scientific knowledge through innovative learning approaches"
        },
        {
          icon: Rocket,
          title: "Innovation",
          description: "Pushing boundaries with cutting-edge educational technologies"
        },
        {
          icon: Users,
          title: "Community",
          description: "Building a global network of STEM enthusiasts and educators"
        },
        {
          icon: Globe,
          title: "Global Impact",
          description: "Making STEM education accessible worldwide"
        }
      ].map((feature, index) => (
        <div key={index} className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-slate-900/50 rounded-xl transition-all duration-300 hover:bg-slate-900/70 hover:transform hover:scale-105">
          <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

