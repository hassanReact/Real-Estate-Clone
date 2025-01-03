import PageTitle from '@/app/Components/pageTitle';
import prisma from '@/lib/prisma'
import { SubscriptionPlan } from '@prisma/client';
import React from 'react'
import PurchasePlan from './_components/PurchasePlan';

const Subscripitonpage = async () => {
  const subscriptionPlanPromise = prisma.subscriptionPlan.findMany();
  const [subscriptionPlans] = await Promise.all([subscriptionPlanPromise])
  return (
    <div>
      <PageTitle title='Subscription Plans'/>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 p-4'>
      {subscriptionPlans.map((item, index) => (
            <Plan key={index} plan={item}/>
          ))}
          </div>
    </div>
  )
}

export default Subscripitonpage


const Plan = ({plan} : {plan : SubscriptionPlan}) => {
  return (
    <div className='border rounded shadow flex flex-col gap-5 justify-between p-5'>  
      <h1 className='text-xl font-bold text-primary-500 text-center'>{plan.name}</h1>
      <h1 className='text-2xl lg:text-4xl text-orange-600 font-bold text-center'>${plan.price.toString()}</h1>
      <hr />
      <div className='flex flex-col gap-1 text-center'>
        {plan.features.split(",").map((feature, index) => (
          <p key={index} className='text-slate-500 text-sm'>{feature.trim()}</p>
        ))}
      </div>
      <PurchasePlan plan={plan}/>
    </div>
  )
}