import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: ${props => props.bg};
    color: ${props => props.color};
    font-size: 0.8rem;
    margin-top: 1rem;
    padding: 5px 10px;
    border-radius: 30px;
`;

const DataWrapper = ({bg, color, content}) => {
    return(
        <Container bg={bg} color={color}>{content}</Container>
    )
}

export default DataWrapper;