function Placeholder(props){
    return(
        <ul>
            {
                props.array.map((index) => {
                    return (
                        <li className="movie"><p>{index}</p></li>
                    );
                })
            }
            
        </ul>
    )
}

export default Placeholder;