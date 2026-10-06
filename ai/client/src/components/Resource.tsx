function Resource(props: any) {
    return (
        <a href={props.href} target="_blank" class="resource">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            {props.children}
        </a>
    )
}

export default Resource
