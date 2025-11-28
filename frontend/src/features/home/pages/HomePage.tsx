import { useRive, StateMachineInput } from '@rive-app/react-canvas'
import TiltedCard from '@/components/TiltedCard'
import { Facebook, Github, Linkedin, LogOut, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { FullscreenRive } from '../components/ShowFullRive'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/AuthContext'
import AvatarCircle from '@/components/etc/AvatarCircle'
import type { User as UserType } from '@/types/user'
import profileService from '@/services/profileService'
import TextType from '@/components/TextType'

export default function HomePage() {
    const riveInputs = useRef<Record<string, StateMachineInput>>({})
    const [showFullRive, setShowFullRive] = useState(false)
    const [userData, setUserData] = useState<UserType[] | null>(null)
    const [loading, setLoading] = useState(false)
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
    const { user, logout } = useAuth()

    const navigate = useNavigate()

    const { rive } = useRive({
        src: `https://static.canva.com/web/riv/c8cefb7b49258078c162ec0c6a8626fd.riv`,
        stateMachines: 'State Machine 1',
        autoplay: true,
    })

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true)
            const req = await profileService.getAllProfile()
            setUserData(req)
            setLoading(false)
        }
        fetchUserData()
    }, [])
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
            navigate(`/profile/${item.username}`)
            return
        }

        setShowFullRive(true)
        setTimeout(() => {
            localStorage.setItem('isFirstLoad', 'false')
            navigate(`/profile/${item.username}`)
            return
        }, 4000)
    }

    const handleChangeIfiniteAnimation = (value: string) => {
        localStorage.setItem('isIfiniteAnimation', value)
        setIsInfiniteAnimation(value)
    }
    return (
        <div className={`min-h-screen  flex items-center justify-center ${userData && userData?.length > 8 && 'py-10'}`}>
            {showFullRive && <FullscreenRive onClose={() => setShowFullRive(false)} />}

            <div className="flex-1 md:max-w-7xl mx-auto rounded-xl ring-4 bg-popover ring-gray-500/20 shadow-lg p-5 md:p-14  space-y-3  animate__animated animate__fadeInUp ">
                <div className="flex items-center flex-col md:flex-row gap-3 md:gap-0  justify-between">
                    <p className="bg-background inline rounded-full px-3 py-1 animate__animated animate__fadeInUp animate__delay-1s">Chúng tôi không tuyển người!</p>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2">
                            Ifinite Animation Globe
                            <Switch checked={isIfiniteAnimation === 'true' ? true : false} onCheckedChange={(check) => handleChangeIfiniteAnimation(String(check))} />
                        </div>
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="font-semibold hover:underline cursor-pointer">
                                    <AvatarCircle user={user} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                                        <User /> Chỉnh sửa hồ sơ
                                    </DropdownMenuItem>

                                    <DropdownMenuItem variant="destructive" className=" cursor-pointer " onClick={() => logout()}>
                                        <LogOut className="text-destructive" /> Đăng xuất
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link to={'/auth'}>
                                <Button className="text-xs md:text-sm">Đăng nhập</Button>
                            </Link>
                        )}
                    </div>
                </div>

                <h1 className="text-3xl font-bold mt-5 animate__animated animate__fadeInUp animate__delay-1s">Ngắm nghía thử các bộ mặt của Team Teaching MindX Biên Hòa nhé</h1>

                <p className="animate__animated animate__fadeInUp animate__delay-1s ">Team Teaching mạnh nhất lịch sử MindX, gồm các thành viên máu lạnh!... à nhầm máu mặt tại đây...</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5 ">
                    {!loading &&
                        userData &&
                        userData.map((member, index) => (
                            <TiltedCard key={member._id} rotateAmplitude={12} scaleOnHover={1.2} showMobileWarning={false} showTooltip={true} displayOverlayContent={true}>
                                <div
                                    className="block bg-background border border-white/10 w-full p-5 rounded-lg shadow animate__animated animate__fadeInUp cursor-pointer"
                                    style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                                    onClick={() => handleClick(member)}
                                >
                                    <img src={member.avatar} alt="" className="w-22 h-22 ring-2 ring-white/10 rounded-full object-cover object-[0%_15%]" />
                                    <div className="space-y-1 mt-5">
                                        <h1 className="text-md font-bold">{member.displayName}</h1>
                                        <p className="text-md">{member.position}</p>
                                        <p className="text-white/50 text-sm mb-2">{member.quote || 'Chưa có quote'}</p>
                                        <div className="flex gap-3 items-center ">
                                            <a
                                                target="_blank"
                                                className="hover:text-primary cursor-pointer text-gray-400 w-6 h-6 flex items-center justify-center  bg-background rounded-sm"
                                                href={member.socialLinks?.facebook}
                                            >
                                                <Facebook size={16} />
                                            </a>
                                            <a
                                                target="_blank"
                                                className="hover:text-primary cursor-pointer text-gray-400 w-6 h-6 flex items-center justify-center  bg-background rounded-sm"
                                                href={member.socialLinks?.github}
                                            >
                                                <Github size={16} />
                                            </a>
                                            <a
                                                target="_blank"
                                                className="hover:text-primary cursor-pointer text-gray-400 w-6 h-6 flex items-center justify-center  bg-background rounded-sm"
                                                href={member.socialLinks?.linkedin}
                                            >
                                                <Linkedin size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </TiltedCard>
                        ))}
                    {loading && (
                        <div className="h-[500px] flex items-center justify-center  col-span-full flex-col gap-5">
                            <div className="w-16 h-16 rounded-full border-x-4 border-x-gray-300/50 border-y-4 border-y-gray-600/50 animate-spin"></div>
                            <TextType text={[`Đang tải thông tin các giáo viên`]} typingSpeed={75} pauseDuration={1500} showCursor={true} cursorCharacter="|" className="text-2xl" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
