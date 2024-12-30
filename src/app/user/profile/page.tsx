import PageTitle from '@/app/Components/pageTitle'
import { getUserById } from '@/lib/actions/user'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Avatar, Button, Card } from '@nextui-org/react'
import { ReactNode } from 'react'
import SectionTitle from './_components/SectionTitle'
import UploadAvatar from './_components/UploadAvatar'
import Link from 'next/link'
import prisma from '@/lib/prisma'

const ProfilePage = async () => {
    const {getUser} =  await getKindeServerSession()
    const user = await getUser()
    const dbUser = await getUserById(user? user.id : "")

    const userSubscription = await prisma.subscriptions.findFirst({
      where: { userId: dbUser?.id},
      include: { plan : true},
      orderBy : { createdAt: "desc" }
    })
  return (
    <div>
        <PageTitle title="My Profile" linkCaptions='Back to Home Page' href='/'/>
    <Card className='m-4 p-4'>
        <SectionTitle title="Basic Information"/>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <div className='flex gap-6'>
        <div className='flex flex-col justify-center'>
        <Avatar className='w-20 h-20' src={dbUser?.avatarUrl || '/Profile.jpg'}/>
        <UploadAvatar userId={dbUser?.id || ""} />
        </div>
            <Attribute title='Name' value={`${dbUser?.firstName} ${dbUser?.lastName}`}/>
            </div>
            <Attribute title='Email' value={`${dbUser?.email}`}/>
            <Attribute title='Registered On' value={`${dbUser?.createdAt.toLocaleDateString()}`}/>
            <Attribute title='Properties Posted' value={`${1}`}/>
        </div>
    </Card>
    <Card className='m-4 p-4 flex flex-col gap-5'>
      <SectionTitle title='Subscription Details'/>
      {userSubscription ? (
        <div>
          <Attribute title='Plan' value={userSubscription.plan.name}/>
          <Attribute title='Price' value={userSubscription.plan.price}/>
          <Attribute title='Purchased On' value={userSubscription.createdAt.toLocaleDateString()}/>
        
        </div> ) : (
          <div className='flex flex-col items-center'>
            <p className='text-center'>No Subscription Found!</p>
          </div>
        )
      }
      <Link href={"/user/subscription"}>
        <Button color='secondary'>
            Purchase Your Subscription
        </Button>
      </Link>
    </Card>
    </div>
  )
}

export default ProfilePage



const Attribute = ({title, value} : {title: string; value: ReactNode}) => {
  return (
    <div className='flex flex-col text-sm mt-2'>
      <span className='text-slate-800 font-semibold'>{title}</span>
      <span className='text-slate-600'>{value}</span>
    </div>
  )
}

