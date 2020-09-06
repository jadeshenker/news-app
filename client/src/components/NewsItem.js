import React from 'react';
import styled from 'styled-components';

import DataWrapper from './DataWrapper';

const ItemWrapper = styled.div`
    display: flex;
    border-bottom: 0.8px solid #898989;
    justify-content: space-between;
    padding: 1.8rem 0rem;
    width: 100%;

    @media (max-width: 928px) {
        flex-wrap: wrap;
    }
`;

const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 40%;

    @media (max-width: 928px) {
        flex-direction: row;
        width: 100%;
        div {
            margin-right: 1rem;
        }
    }
`;

const calcDate = (publishedAt) => {
    let d = new Date(publishedAt);

    let weekday = ['Sunday', 'Monday', 'Tuesday', 
    'Wednesday', 'Thursday', 'Friday', 'Saturday' ]; 

    let months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let day = weekday[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    
    let displayDate = day + ", " + month + " " + date;

    return displayDate;
}

const NewsItem = ({article}) => {

    return(
        <ItemWrapper>
            <div>
                <h3><a href={`${article.url}`} target="_blank" rel="noopener noreferrer">{article.title}</a></h3>
                <p>{article.description}</p>
            </div>
            <DataContainer>
                <DataWrapper bg='#CAF5FF' color='#2C545C' content={calcDate(article.publishedAt)} />
                <DataWrapper bg='#D8F6A5' color='#5C703D' content={article.source.name} />
            </DataContainer>
        </ItemWrapper>
    )

}

export default NewsItem;