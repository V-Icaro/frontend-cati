import React from 'react'

function Pagination(props) {
    
        const { postsPerPage, totalPosts, paginate, nextPage, prevPage, page, quant } = props;

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={page === 1 ? "page-item disabled" : "page-item"}>
                        <a className="page-link" onClick={() => prevPage()}>Previous</a>
                    </li>
                    {pageNumbers.map(num => (
                        <li className={page === num ? "page-item active" : "page-item"} key={num}>
                            <a onClick={() => paginate(num)} className="page-link">{num}</a>
                        </li>
                    ))}
                    <li className={quant < postsPerPage ? "page-item disabled" : "page-item"}>
                        <a className="page-link" onClick={() => nextPage()}>Next</a>
                    </li>
                </ul>
            </nav>
            
        )
    
}

export default Pagination