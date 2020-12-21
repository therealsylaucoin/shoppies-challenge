function Movie(props){

    const { movie } = props;
    const backgroundColor = '#F4F5FA';

    return(
        <>
        {
            movie.Poster !== 'N/A' 
            ?   <div 
                    className="movie__img" 
                    aria-label={movie.Title} 
                    style={{backgroundImage: `url(${movie.Poster})`}}>
                </div>
            :   <div 
                    className="movie__img" 
                    aria-label={movie.Title}
                    style={{backgroundColor: backgroundColor}}>
                        <p>Poster not available</p>
                </div>
        }

            <div className="movie__info">
                <p>{movie.Title}</p>
                <p>({movie.Year})</p>
            </div>
        </>
    )
}

export default Movie;