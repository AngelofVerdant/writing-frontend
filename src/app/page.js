'use client'
import { Messages } from '@/helpers';
import { useFetchResource, useFetchResourceOne } from '@/hooks';
import { AchievementSectionSkeleton, EssaySectionSkeleton, PhaseSectionSkeleton, PointSectionSkeleton } from '@/skeletons';
import { useDarkMode } from '@/state/DarkModeProvider';
import Link from 'next/link';

export default function Home() {
    const { data: dataFetchedPoints } = useFetchResource('points/all');
    const { data: dataFetchedEssays } = useFetchResource('essays/all');
    const { data: dataFetchedPhases } = useFetchResource('phases/all');
    const { data: dataFetchedAchievements } = useFetchResourceOne('achievements');
    const { darkMode } = useDarkMode();

  return (
    <>
      {dataFetchedPoints.error && <Messages>{dataFetchedPoints.error}</Messages>}
      {dataFetchedEssays.error && <Messages>{dataFetchedEssays.error}</Messages>}
      {dataFetchedPhases.error && <Messages>{dataFetchedPhases.error}</Messages>}
      {dataFetchedAchievements.error && <Messages>{dataFetchedAchievements.error}</Messages>}

      <section className="relative h-96 bg-cover bg-center" style={{backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/10/14/11/02/background-2850204_1280.jpg")'}}>
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50"></div>
        <div className="container mx-auto flex flex-col justify-center items-center h-full text-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-8">Professional Essay Writers Writing Service That Could Be Your Golden Goose</h1>
          <Link href={`/order`}>
            <button className={`${darkMode ? 'bg-gray-800 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} font-semibold py-2 px-4 rounded-full`}>
              Order Now
            </button>
          </Link>
        </div>
      </section>

      {dataFetchedPoints.loading && <PointSectionSkeleton number={6}/>}

      {!dataFetchedPoints.loading && !dataFetchedPoints.error && (
        <section className={`px-4 py-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>
            Essay Writer For Hire The Safest Place Online
          </h1>
          <div className="max-w-6xl mx-auto">
            <section className="px-4 py-12 text-left">
              <p className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-700'} mb-8`}>
                The burgeoning of the writing industry has radically transformed lives of busy students. Now, a frazzled learner doesn’t have to worry where to hire an essay writer – it can be done online. However, as the paper writing industry has ballooned to gargantuan proportions, students have found themselves at a loss to select the best place to hire inexpensive essay writers. There are hundreds of essay-selling sites, and each one is almost indistinguishable from another. If you are also perplexed by the multiplicity of choice and wonder “Can I hire a essay writer here?” read why we are the best essay writing service:
              </p>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataFetchedPoints?.data?.points?.map((point) => (
                <div key={point.point_id} className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'} shadow-md rounded-xl p-8`}>
                  <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>{point.pointname}</h3>
                  <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-700'}`}>{point.pointdescription}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {dataFetchedAchievements.loading && <AchievementSectionSkeleton number={6}/>}

      {!dataFetchedAchievements.loading && !dataFetchedAchievements.error && (
        <section className="relative bg-cover bg-center py-20" style={{backgroundImage: 'url("https://images.pexels.com/photos/414565/pexels-photo-414565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'}}>
          <div className="container mx-auto text-center">
            <div className="mb-12">
              <h2 className={`text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>Our Achievements</h2>
              <p className={`text-4xl font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} opacity-90`}>We take pride in our accomplishments. Here are some key statistics about our service.</p>
            </div>
            {dataFetchedAchievements?.data && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className={`p-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} bg-opacity-25 rounded-lg`}>
                    <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>{dataFetchedAchievements.data.orderscompleted}+</h3>
                    <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} opacity-75`}>Orders Completed</p>
                  </div>
                  <div className={`p-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} bg-opacity-25 rounded-lg`}>
                    <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>{dataFetchedAchievements.data.satisfiedclients}+</h3>
                    <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} opacity-75`}>Satisfied Clients</p>
                  </div>
                  <div className={`p-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} bg-opacity-25 rounded-lg`}>
                    <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>{dataFetchedAchievements.data.positivefeedbacks}+</h3>
                    <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} opacity-75`}>Positive Feedbacks</p>
                  </div>
                  <div className={`p-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} bg-opacity-25 rounded-lg`}>
                    <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>{dataFetchedAchievements.data.freebiesreleased}+</h3>
                    <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} opacity-75`}>Freebies Released</p>
                  </div>
              </div>
            )}
          </div>
        </section>
      )}

      {dataFetchedEssays.loading && <EssaySectionSkeleton number={6}/>}

      {!dataFetchedEssays.loading && !dataFetchedEssays.error && (
        <section className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto text-left">
            <h2 className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} mb-8`}>
              Types Of Essays We Write
            </h2>
            <section className="px-4 py-12 text-left">
              <p className={`text-2xl ${darkMode ? 'text-white' : 'text-gray-700'} mb-8`}>
                The burgeoning of the writing industry has radically transformed lives of busy students. Now, a frazzled learner doesn’t have to worry where to hire an essay writer – it can be done online. However, as the paper writing industry has ballooned to gargantuan proportions, students have found themselves at a loss to select the best place to hire inexpensive essay writers. There are hundreds of essay-selling sites, and each one is almost indistinguishable from another. If you are also perplexed by the multiplicity of choice and wonder “Can I hire a essay writer here?” read why we are the best essay writing service:
              </p>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dataFetchedEssays?.data?.essays?.map((essay) => (
                <div key={essay.essay_id} className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'} shadow-md rounded-lg p-6`}>
                  <h3 className="text-2xl font-semibold mb-2">{essay.essayname}</h3>
                  <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-700'}`}>{essay.essaydescription}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`py-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <div className={`max-w-6xl mx-auto flex items-center justify-between px-4`}>
          <div>
            <p className={`text-2xl font-semibold text-gray-700 ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>
              We are eager to help you. Are you eager to succeed?
            </p>
          </div>
          <Link href={`/order`}>
            <button className={`${darkMode ? 'bg-gray-800 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} font-semibold py-2 px-4 rounded-full`}>
              Order Now
            </button>
          </Link>
        </div>
      </section>
      

      {dataFetchedPhases.loading && <PhaseSectionSkeleton number={6}/>}

      {!dataFetchedPhases.loading && !dataFetchedPhases.error && (
        <section className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} mb-8 text-center`}>
              Professional College Essay Writers
              <br />
              Hire in Five Minutes
            </h2>
            <div className={`flex flex-col space-y-8`}>
              {dataFetchedPhases?.data?.phases?.map((phase) => (
                <div key={phase.phase_id} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} shadow-md rounded-lg p-6`}>
                  <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>{phase.phasename}</h3>
                  <p className={`text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>{phase.phasedescription}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  )
}