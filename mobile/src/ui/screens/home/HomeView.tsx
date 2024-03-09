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
import { PageContainer } from '../../components/PageContainer.component';
import HomeImg from '../../../assets/Illustrations/home.png';
import { Alert } from '../../components/Alert.component';
import { Card } from '../../components/Card.component';
import { COLORS } from '../../../utils/style';
import {
  ActionSheet,
  ActionSheetItem,
} from '../../components/ActionSheet.component';

interface HomeViewProps {
  status: Status;
  posts?: Post[];
  navigateToPost: (id: number) => void;
  navigateToCreatePost: () => void;
  showActionSheet: boolean;
  toggleActionSheet: () => void;
  onLogout: () => void;
  navigateToChatBot: () => void;
}

export const HomeView = ({
  status,
  posts,
  navigateToPost,
  navigateToCreatePost,
  showActionSheet,
  toggleActionSheet,
  onLogout,
  navigateToChatBot,
}: HomeViewProps) => {
  return (
    <PageContainer scroll>
      <Heading alignSelf="center" marginBottom={24}>
        Front-end development blog
      </Heading>
      {status === 'loading' && <Spinner color={'white'} size={'large'} />}
      {status === 'error' && (
        <Alert text="error loading posts" action="error" />
      )}
      {status === 'fetched' && (
        <Fragment>
          {(!posts || posts?.length === 0) && (
            <Image
              source={HomeImg}
              w={300}
              h={250}
              aspectRatio={'auto'}
              alt="logo"
              alignSelf="center"
              marginBottom={24}
            />
          )}
          {posts &&
            posts?.length > 0 &&
            posts.map((p) => (
              <Card key={p.id} post={p} navigateToPost={navigateToPost} />
            ))}
          <Button
            backgroundColor={COLORS.PRIMARY}
            onPress={navigateToCreatePost}
            marginVertical="$3"
          >
            <ButtonText>Create post</ButtonText>
          </Button>
        </Fragment>
      )}
      <ActionSheet isOpen={showActionSheet} onClose={toggleActionSheet}>
        {/* <ActionSheetItem text="Chatbot" onPress={navigateToChatBot} /> */}
        <ActionSheetItem text="Logout" onPress={onLogout} />
      </ActionSheet>
    </PageContainer>
  );
};
