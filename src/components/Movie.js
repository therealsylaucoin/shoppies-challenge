function Movie(props){
    const { movie } = props;

    return(
        <>
        {
            movie.Poster !== 'N/A' 
            ?   <div 
                    className="img" 
                    aria-label={movie.Title} 
                    style={{backgroundImage: `url(${movie.Poster})`}}>
                </div>
            :   <div 
                    className="img noPoster" 
                    aria-label={movie.Title}
                >
                </div>
        }
            <div className="info">
                <p>{movie.Title}</p>
                <p>({movie.Year})</p>
            </div>
        </>
    )
}

export default Movie;