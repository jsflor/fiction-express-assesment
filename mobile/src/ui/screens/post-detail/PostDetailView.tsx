import {
  Button,
  ButtonText,
  Heading,
  Text,
  Image,
  Spinner,
} from '@gluestack-ui/themed';
import { Post } from '../../../domain/post.entity';
import { Fragment } from 'react';
import { Status } from '../../../utils/types';
import { Alert } from '../../components/Alert.component';
import { PageContainer } from '../../components/PageContainer.component';
import { COLORS } from '../../../utils/style';

interface PostDetailViewProps {
  status: Status;
  deleteStatus: Status;
  post?: Post;
  onDeletePost: () => void;
  canDeletePost: boolean;
}

export const PostDetailView = ({
  status,
  post,
  onDeletePost,
  deleteStatus,
  canDeletePost,
}: PostDetailViewProps) => {
  return (
    <PageContainer>
      {status === 'loading' && <Spinner size={'large'} />}
      {status === 'error' && (
        <Alert text="error loading posts" action="error" />
      )}
      {status === 'fetched' && (
        <Fragment>
          <Image
            mb="$6"
            h={240}
            width="$full"
            borderRadius="$md"
            alt={'post img'}
            source={{
              uri: 'https://images.unsplash.com/photo-1529693662653-9d480530a697?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
          />
          <Heading
            alignSelf="center"
            marginBottom={12}
            fontWeight="bold"
            color={COLORS.SECONDARY}
          >
            {post.title}
          </Heading>
          <Text
            fontSize="$sm"
            fontStyle="normal"
            fontFamily="$heading"
            fontWeight="$normal"
            lineHeight="$sm"
            alignSelf="center"
            mb="$2"
            sx={{
              color: COLORS.TERTIARY,
            }}
          >
            May 15, 2023 by {post.author_username}
          </Text>
          <Text
            fontSize="$sm"
            fontStyle="normal"
            fontWeight="$normal"
            lineHeight="$sm"
            alignSelf="center"
            mb="$2"
          >
            {post.content}
          </Text>
          {deleteStatus === 'error' && (
            <Alert text="error deleting post" action="error" />
          )}
          {canDeletePost && (
            <Button
              backgroundColor={COLORS.PRIMARY}
              onPress={onDeletePost}
              marginVertical="$3"
              disabled={deleteStatus === 'loading'}
            >
              {deleteStatus === 'loading' && (
                <Spinner color={'white'} size={'small'} />
              )}
              {deleteStatus !== 'loading' && (
                <ButtonText>Delete post</ButtonText>
              )}
            </Button>
          )}
        </Fragment>
      )}
    </PageContainer>
  );
};
