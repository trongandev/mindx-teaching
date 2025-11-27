import BlurText from '@/components/BlurText'
import TextType from '@/components/TextType'
import TiltedCard from '@/components/TiltedCard'
import { INTRO_TEAMS_MINDX } from '@/config/config'
import { ArrowRight, Mail } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import AnimatedBackground from '../components/AnimatedBackground'
import { StateMachineInput, useRive } from '@rive-app/react-canvas'
import { useEffect, useRef } from 'react'
import CountUp from '@/components/CountUp'
export default function IntroduceProfilePage() {
    const pathname = useLocation().pathname
    const slug = pathname.split('/profile/')[1]
    const filterProfile = INTRO_TEAMS_MINDX.find((member) => member.slug === slug)
    const riveInputs = useRef<Record<string, StateMachineInput>>({})

    const { RiveComponent, rive } = useRive({
        src: `/shake-it-duo.riv`,
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
    return (
        <div className="relative">
            <div className="absolute -z-10 inset-0 h-full w-full bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:80px_80px] opacity-50" />
            <AnimatedBackground />
            <div className="p-5 md:p-0 max-w-7xl mx-auto h-screen grid md:grid-cols-2 items-center gap-6 grid-cols-1">
                <div className="animate__animated animate__fadeInUp">
                    <div className="flex items-center gap-3 mb-6 bg-popover  w-fit p-4 rounded-2xl">
                        <img src={filterProfile?.avatar || ''} className="w-10 h-10 rounded-full object-cover" />
                        <q>{filterProfile?.quote}</q>
                    </div>
                    <h1 className="text-5xl font-bold mb-6">
                        <TextType text={[`Hi I'm ${filterProfile?.name}`]} typingSpeed={75} pauseDuration={1500} showCursor={true} cursorCharacter="|" />
                    </h1>
                    <BlurText text={filterProfile?.description || ''} delay={150} animateBy="words" direction="top" className=" mb-6" />
                    <a
                        href={`mailto:${filterProfile?.email || ''}`}
                        className="border h-16 bg-popover/60 backdrop-blur-xs border-white/10 shadow px-5 rounded-full flex items-center justify-center gap-2 transition-all duration-500 hover:scale-105 cursor-pointer"
                    >
                        <Mail /> Liên hệ qua email: {filterProfile?.email}
                    </a>
                </div>
                <div className="hidden md:block md:ml-auto animate__animated animate__fadeInUp animate__delay-1s">
                    <TiltedCard rotateAmplitude={12} scaleOnHover={1.2} showMobileWarning={false} showTooltip={true} displayOverlayContent={true}>
                        <div className="bg-white/10 rounded-4xl flex flex-col items-center w-[400px] overflow-hidden ring-2 ring-white/20 shadow-lg relative group">
                            <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/10 to-transparent  -translate-x-full group-hover:translate-x-full transition-all duration-500"></div>
                            <div className="py-5 text-center">
                                <h1 className="text-3xl font-bold mb-1">{filterProfile?.name}</h1>
                                <p>{filterProfile?.position}</p>
                            </div>
                            <img src={filterProfile?.avatar || ''} alt={filterProfile?.name || ''} className="w-full h-[500px] object-cover rounded-t-4xl brightness-90" />
                            <div className="absolute w-[90%] h-16 bg-popover/50 backdrop-blur-md bottom-2 rounded-2xl flex items-center px-3 gap-2 shadow-sm">
                                <img src={filterProfile?.avatar || ''} alt={filterProfile?.name || ''} className="w-10 h-10 rounded-full object-cover" />
                                <div className="flex-1 flex items-center justify-between">
                                    <div className="">
                                        <h1>@{filterProfile?.username || ''}</h1>
                                        <p className="text-sm flex items-center gap-1">
                                            <div className="w-2 h-2 bg-green-600 rounded-full -translate-y-px"></div> Online
                                        </p>
                                    </div>
                                    <a href={`mailto:${filterProfile?.email || ''}`} className="border border-white/60 h-10 flex items-center px-4 rounded-lg text-white text-sm bg-gray-700/20">
                                        Contact me
                                    </a>
                                </div>
                            </div>
                        </div>
                    </TiltedCard>
                </div>
            </div>

            <div className=" max-w-7xl mx-auto ">
                <div className="h-screen flex items-center justify-center ">
                    <div className="text-center space-y-10">
                        <h1 className="text-4xl font-bold mb-2 " data-aos="fade-up" data-aos-delay="200">
                            Về tôi
                        </h1>
                        <p data-aos="fade-up" data-aos-delay="300" className="mx-auto w-full md:w-[70%] text-xl">
                            {filterProfile?.aboutMe || ''}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 flex-1 w-full">
                            <div
                                className="w-full h-32 border bg-popover/20 backdrop-blur-xs border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3  p-6"
                                data-aos="fade-right"
                                data-aos-delay="200"
                            >
                                <h1 className="text-xl font-medium">Số năm giảng dạy</h1>
                                <CountUp
                                    from={0}
                                    to={filterProfile?.classData?.expTeachingYears ? new Date().getFullYear() - new Date(filterProfile.classData.expTeachingYears).getFullYear() + 1 : 0}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text text-3xl font-extrabold"
                                />
                            </div>
                            <div
                                className="w-full h-32 border bg-popover/20 backdrop-blur-xs border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3  p-6"
                                data-aos="fade-up"
                                data-aos-delay="300"
                            >
                                <h1 className="text-xl font-medium">Số lớp đã dạy</h1>
                                <CountUp
                                    from={0}
                                    to={filterProfile?.classData?.numberOfClassesTaught || 12}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text text-3xl  font-extrabold"
                                />
                            </div>
                            <div
                                className="w-full h-32 border bg-popover/20 backdrop-blur-xs border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3  p-6"
                                data-aos="fade-left"
                                data-aos-delay="400"
                            >
                                <h1 className="text-xl font-medium">Tổng số học viên đã dạy</h1>
                                <CountUp from={0} to={filterProfile?.classData?.totalStudents || 89} separator="," direction="up" duration={1} className="count-up-text text-3xl font-extrabold" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-screen flex items-center justify-center ">
                    <div className="">
                        <h1 className="text-4xl font-bold mb-12 text-center" data-aos="fade-up">
                            Dự án cá nhân
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5  mb-5 ">
                            {filterProfile?.project?.map((proj, index) => (
                                <div
                                    key={index}
                                    className="bg-popover/20 backdrop-blur-xs rounded-2xl border border-white/10 hover:border-white/30 transition-all w-full overflow-hidden"
                                    data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                                    data-aos-delay={index * 200}
                                >
                                    <img src={proj.image} alt={proj.title} className="h-80 w-full object-cover" />
                                    <div className="p-6 space-y-3">
                                        <h3 className="text-2xl font-bold mb-2">{proj.title}</h3>
                                        <p className="mb-4 text-sm">{proj.description}</p>
                                        <a href={proj.websiteLink} target="_blank" className="text-blue-500 hover:underline">
                                            Xem trang web <ArrowRight size={16} className="inline-block ml-1" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-screen flex items-center justify-center ">
                    <div className="">
                        <h1 className="text-4xl font-bold mb-12 text-center" data-aos="fade-up">
                            Thành tựu
                        </h1>
                        <div className="relative">
                            <div className={`absolute md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-linear-to-b from-blue-500 via-purple-500 to-pink-500`}></div>
                            {filterProfile?.achievements?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex w-full items-center flex-row  mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                    data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                                    data-aos-delay={index * 100}
                                >
                                    <div className="block md:hidden w-4 h-4 bg-blue-500 rounded-full border-4 border-background relative z-10"></div>
                                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                                        <div className="bg-popover/20 backdrop-blur-xs p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all w-full">
                                            <h3 className="text-xl font-bold mb-2">{item.event}</h3>
                                            {item.desc && <p className="text-gray-400">{item.desc}</p>}
                                            <p className="text-sm text-gray-400 mb-3">{item.year}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block w-4 h-4 bg-blue-500 rounded-full border-4 border-background relative z-10"></div>
                                    <div className="w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="cursor-pointer h-screen"
                onMouseEnter={() => {
                    if (riveInputs.current['onHover']) riveInputs.current['onHover'].value = true
                }}
                onMouseLeave={() => {
                    if (riveInputs.current['onHover']) riveInputs.current['onHover'].value = false
                }}
                onMouseDown={() => {
                    if (riveInputs.current['onMousedown']) riveInputs.current['onMousedown'].value = true
                }}
                onMouseUp={() => {
                    if (riveInputs.current['onMousedown']) riveInputs.current['onMousedown'].value = false
                }}
            >
                <h1 className="text-center text-2xl mb-2 font-bold">Nhìn gì?, tét 2 quả đào đi</h1>
                <RiveComponent className="h-[80vh] bg-transparent" />
            </div>
        </div>
    )
}
