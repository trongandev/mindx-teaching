import { useRive, StateMachineInput } from '@rive-app/react-canvas'
import TiltedCard from '@/components/TiltedCard'
import { INTRO_TEAMS_MINDX } from '@/config/config'
import { Facebook, Github, Linkedin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { FullscreenRive } from '../components/ShowFullRive'
import { Switch } from '@/components/ui/switch'

export default function HomePage() {
    const riveInputs = useRef<Record<string, StateMachineInput>>({})
    const [showFullRive, setShowFullRive] = useState(false)
    const [isIfiniteAnimation, setIsInfiniteAnimation] = useState(() => {
        return localStorage.getItem('isIfiniteAnimation') || 'false'
    })
    const [isFirstLoad, setIsFirstLoad] = useState(() => {
        const getIsFirstLoad = localStorage.getItem('isFirstLoad')
        if (getIsFirstLoad === null) {
            localStorage.setItem('isFirstLoad', 'true')
            return true
        }
        return getIsFirstLoad
    })

    const navigate = useNavigate()

    const { rive } = useRive({
        src: `https://static.canva.com/web/riv/c8cefb7b49258078c162ec0c6a8626fd.riv`,
        stateMachines: 'State Machine 1',
        autoplay: true,
    })

    // Grab inputs for the first Rive
    useEffect(() => {
        if (!rive) return
        const inputs = rive.stateMachineInputs('State Machine 1')
        const inputMap: Record<string, StateMachineInput> = {}
        inputs.forEach((i) => {
            inputMap[i.name] = i
        })
        riveInputs.current = inputMap
    }, [rive])

    // Handler for click → show fullscreen animation
    const handleClick = (item: any) => {
        if (isIfiniteAnimation === 'false' && isFirstLoad === 'false') {
            setIsFirstLoad('false')
            navigate(`/profile/${item.slug}`)
            return
        }

        setShowFullRive(true)
        setTimeout(() => {
            localStorage.setItem('isFirstLoad', 'false')
            navigate(`/profile/${item.slug}`)
            return
        }, 4000)
    }

    const handleChangeIfiniteAnimation = (value: string) => {
        localStorage.setItem('isIfiniteAnimation', value)
        setIsInfiniteAnimation(value)
    }
    console.log(isIfiniteAnimation)
    return (
        <div className=" min-h-screen  flex items-center justify-center">
            {showFullRive && <FullscreenRive onClose={() => setShowFullRive(false)} />}

            <div className="flex-1 md:max-w-7xl mx-auto rounded-xl ring-4 ring-gray-500/20 shadow-lg p-5 md:p-14  space-y-3  animate__animated animate__fadeInUp ">
                <div className="flex items-center justify-between">
                    <p className="bg-popover inline rounded-full px-3 py-1 animate__animated animate__fadeInUp animate__delay-1s">Chúng tôi không tuyển người!</p>
                    <div className="flex items-center gap-2">
                        Ifinite Animation Globe
                        <Switch checked={isIfiniteAnimation === 'true' ? true : false} onCheckedChange={(check) => handleChangeIfiniteAnimation(String(check))} />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mt-5 animate__animated animate__fadeInUp animate__delay-1s">Ngắm nghía thử các bộ mặt của Team Teaching MindX Biên Hòa nhé</h1>

                <p className="animate__animated animate__fadeInUp animate__delay-1s ">Team Teaching mạnh nhất lịch sử MindX, gồm các thành viên máu lạnh!... à nhầm máu mặt tại đây...</p>

                {/* ✅ Fullscreen Rive overlay */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5 ">
                    {INTRO_TEAMS_MINDX.map((member, index) => (
                        <TiltedCard key={member.id} rotateAmplitude={12} scaleOnHover={1.2} showMobileWarning={false} showTooltip={true} displayOverlayContent={true}>
                            <div
                                className="block bg-popover w-full p-5 rounded-lg shadow animate__animated animate__fadeInUp cursor-pointer"
                                style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                                onClick={() => handleClick(member)}
                            >
                                <img src={member.avatar ? member.avatar : `/images/${member.slug}.jpg`} alt="" className="w-22 h-22 rounded-full object-cover object-[0%_15%]" />
                                <div className="space-y-1 mt-5">
                                    <h1 className="text-md font-bold">{member.name}</h1>
                                    <p className="text-md">{member.position}</p>
                                    <p className="text-white/50 text-sm mb-2">{member.quote}</p>
                                    <div className="flex gap-3 items-center ">
                                        <a
                                            target="_blank"
                                            className="hover:text-primary cursor-pointer text-gray-400 w-6 h-6 flex items-center justify-center  bg-background rounded-sm"
                                            href={member.socialLinks.facebook}
                                        >
                                            <Facebook size={16} />
                                        </a>
                                        <a
                                            target="_blank"
                                            className="hover:text-primary cursor-pointer text-gray-400 w-6 h-6 flex items-center justify-center  bg-background rounded-sm"
                                            href={member.socialLinks.github}
                                        >
                                            <Github size={16} />
                                        </a>
                                        <a
                                            target="_blank"
                                            className="hover:text-primary cursor-pointer text-gray-400 w-6 h-6 flex items-center justify-center  bg-background rounded-sm"
                                            href={member.socialLinks.linkedin}
                                        >
                                            <Linkedin size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </TiltedCard>
                    ))}
                </div>
            </div>
        </div>
    )
}
