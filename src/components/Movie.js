function Movie(props){

    const { poster, title, year } = props;

    return(
        <>

        {
            poster !== 'N/A' 
            ?   <div 
                    className="movie__img" 
                    aria-label={title} 
                    style={{backgroundImage: `url(${poster})`}}>
                </div>
            :   <div 
                    className="movie__img" 
                    aria-label={title}>
                        <p>Poster not available</p>
                </div>
        }

            <div className="movie__info">
                <p>{title}</p>
                <p>({year})</p>
            </div>
        </>
    )
}

export default Movie;