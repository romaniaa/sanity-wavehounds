export default function PostDate({date, className}) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-CA', options)
    return (
        <time dateTime={date} className={className}>{formattedDate}</time>
    )
}