import Header from "./Header";
import Footer from "./Footer";
import MetaTitle from "./MetaTitle";
import MetaDescription from "./MetaDescription";

export default function Layout({children, menus, siteSettings, pageData}) {
    const mainMenu = menus && menus.find(m => m.slug.current === 'main-menu')
    return (
        <div className={'h-full flex flex-col'}>
            <MetaTitle pageTitle={pageData?.page?.title} siteTitle={siteSettings?.title} />
            <MetaDescription description={pageData?.page?.description} />
            <Header menu={mainMenu} />
            <main className={'grow'}>
                {children}
            </main>
            <Footer className={'w-full bg-gray-200 h-16 flex items-center shrink-0'}/>
        </div>
    )
}