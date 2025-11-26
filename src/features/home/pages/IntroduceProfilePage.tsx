import BlurText from '@/components/BlurText'
import ShinyText from '@/components/ShinyText'
import Stack from '@/components/Stack'
import TextType from '@/components/TextType'
import TiltedCard from '@/components/TiltedCard'
import { INTRO_TEAMS_MINDX } from '@/config/config'
import { Download } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export default function IntroduceProfilePage() {
    const pathname = useLocation().pathname
    const slug = pathname.split('/profile/')[1]
    const filterProfile = INTRO_TEAMS_MINDX.find((member) => member.slug === slug)
    const images = [
        { id: 1, img: '/images/hocvien1.jpg' },
        { id: 2, img: '/images/hocvien2.jpg' },
        { id: 3, img: '/images/hocvien3.jpg' },
        { id: 4, img: '/images/hocvien4.jpg' },
        { id: 5, img: '/images/hocvien5.jpg' },
    ]
    return (
        <div className="">
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
                    <div className="flex items-center sm:gap-4 gap-2">
                        <a
                            href={filterProfile?.cvLink || '#'}
                            className="flex items-center  gap-2 font-semibold bg-popover p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors "
                        >
                            <ShinyText text="Download CV" disabled={false} speed={1} className="custom-class" />
                            <Download size={18} />
                        </a>
                    </div>
                </div>
                <div className=" md:ml-auto animate__animated animate__fadeInUp animate__delay-1s">
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

            <div className="mt-[500px] md:mt-0 max-w-7xl mx-auto h-[80vh] my-20 rounded-[20px] border-8 relative border-gray-500/50 flex items-center md:flex-row flex-col gap-5 px-6">
                <div className="absolute w-38 h-2 bg-gray-500 -top-15 rotate-45 rounded-md left-[calc(50%-8rem)]"></div>
                <div className="absolute w-38 h-2 bg-gray-500 -top-15 -rotate-45 rounded-md right-[calc(50%-8rem)]"></div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">Về tôi</h1>
                    <BlurText
                        text=" Khi tôi còn ngồi trên ghế nhà trường, tôi đã luôn tò mò và khao khát khám phá thế giới công nghệ. Vì thế việc dạy học công nghệ cho người khác là một niềm đam mê đối với tôi."
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className=" mb-6"
                    />
                </div>
                <div className="flex-1 hidden md:block ">
                    <Stack randomRotation={true} sensitivity={180} sendToBackOnClick={false} cardDimensions={{ width: 400, height: 400 }} cardsData={images} />
                </div>
            </div>
            {/* <div className="">
                <ScrollStack itemDistance={200} itemStackDistance={30} baseScale={0.85}>
                    <ScrollStackItem>
                        <h2>Card 1</h2>
                        <p>This is the first card in the stack</p>
                    </ScrollStackItem>
                    <ScrollStackItem>
                        <h2>Card 2</h2>
                        <p>This is the second card in the stack</p>
                    </ScrollStackItem>
                    <ScrollStackItem>
                        <h2>Card 3</h2>
                        <p>This is the third card in the stack</p>
                    </ScrollStackItem>
                </ScrollStack>
            </div> */}
        </div>
    )
}
