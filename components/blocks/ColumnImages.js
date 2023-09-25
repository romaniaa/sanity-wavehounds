import VitalImage from "./VitalImage"

export default function TwoImages({value}) {

    const narrowSizes = '(max-width: 1024px) 100vw, (max-width: 1920px) 42vw, 748px'
    const wideSizes = '(max-width: 1024px) 100vw, (max-width: 1920px) 58vw, 1047px'

    return(
        <div className={'flex flex-col laptop:flex-row items-end py-24 laptop:py-50 container-wide'}>
            <div className={`pb-24 laptop:pb-48 w-full ${value.wide === 'right' ? 'laptop:w-5/12' : 'laptop:w-7/12 laptop:mb-120' }`}>
                <VitalImage value={value.image_one} sizes={value.wide === 'right' ? narrowSizes : wideSizes} className={'w-full'} captionClass={value.wide === 'right' ? 'w-full' : 'w-full laptop:w-9/12'} />
            </div>
            <div className={`pb-24 laptop:pb-48 w-full laptop:ml-24 ${value.wide === 'right' ? 'laptop:w-7/12 laptop:mb-120' : 'laptop:w-5/12' }`}>
                <VitalImage value={value.image_two} sizes={value.wide === 'right' ? wideSizes : narrowSizes} className={'w-full'} captionClass={value.wide === 'right' ? 'w-full laptop:w-9/12' : 'w-full'} />
            </div>
        </div>
    )
}