import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../list/CommentList";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import data from "../../data.json";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px); /* 수정된 calc 구문 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;
    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage() {
    const navigate = useNavigate();
    const { postId } = useParams();

    // postId를 숫자로 변환
    const numericPostId = parseInt(postId, 10);

    // postId와 일치하는 포스트 찾기
    const post = data.find((item) => item.id === numericPostId);

    const [comment, setComment] = useState(""); // useState는 최상위 레벨에서 호출

    if (!post) {
        return (
            <Wrapper>
                <Container>
                    <p>포스트를 찾을 수 없습니다.</p>
                    <Button
                        title="뒤로가기"
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </Container>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Container>
                <Button 
                    title="뒤로가기"
                    onClick={() => {
                        navigate("/");
                    }}
                />

                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={post.comments || []} /> {/* comments 필드를 사용하는 것으로 수정 */}

                <TextInput
                    height={40}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                />
                <Button 
                    title="댓글 작성하기"
                    onClick={() => {
                        // 댓글 작성 처리 로직 추가 필요
                        navigate("/");
                    }}    
                />
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;
