import TiltedCard from '@/components/TiltedCard'
import { INTRO_TEAMS_MINDX } from '@/config/config'
import { Facebook, Github, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div className=" min-h-screen  flex items-center justify-center">
            <div className="flex-1 md:max-w-7xl mx-auto rounded-xl ring-4 ring-gray-500/20 shadow-lg p-5 md:p-14  space-y-3  animate__animated animate__fadeInUp ">
                <p className="bg-popover inline rounded-full px-3 py-1 animate__animated animate__fadeInUp animate__delay-1s">Chúng tôi không tuyển người!</p>

                <h1 className="text-3xl font-bold mt-5 animate__animated animate__fadeInUp animate__delay-1s">Ngắm nghía thử các bộ mặt của Team Teaching MindX Biên Hòa nhé</h1>

                <p className="animate__animated animate__fadeInUp animate__delay-1s ">Team Teaching mạnh nhất lịch sử MindX, gồm các thành viên máu lạnh!... à nhầm máu mặt tại đây...</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5 ">
                    {INTRO_TEAMS_MINDX.map((member, index) => (
                        <TiltedCard key={member.id} rotateAmplitude={12} scaleOnHover={1.2} showMobileWarning={false} showTooltip={true} displayOverlayContent={true}>
                            <Link
                                to={`/profile/${member.slug}`}
                                className="block bg-popover w-full p-5 rounded-lg shadow animate__animated animate__fadeInUp "
                                style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                            >
                                <img src={member.avatar} alt="" className="w-22 h-22 rounded-full object-cover" />
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
                            </Link>
                        </TiltedCard>
                    ))}
                </div>
            </div>
        </div>
    )
}
