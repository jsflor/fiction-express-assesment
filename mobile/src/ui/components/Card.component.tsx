import {
  Card as GlueCard,
  Heading,
  Text,
  Image,
  Link,
  LinkText,
  HStack,
  Icon,
  ArrowRightIcon,
} from '@gluestack-ui/themed';
import { Post } from '../../domain/post.entity';
import { COLORS } from '../../utils/style';

interface CardProps {
  post: Post;
  navigateToPost: (id: number) => void;
}

export function Card({ post, navigateToPost }: CardProps) {
  return (
    <GlueCard p="$5" borderRadius="$lg" maxWidth={360} m="$3">
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
      <Text
        fontSize="$sm"
        fontStyle="normal"
        fontFamily="$heading"
        fontWeight="$normal"
        lineHeight="$sm"
        mb="$2"
        sx={{
          color: COLORS.TERTIARY,
        }}
      >
        May 15, 2023 by {post.author_username}
      </Text>
      <Heading size="md" fontFamily="$heading" mb="$4" color={COLORS.SECONDARY}>
        {post.title}
      </Heading>
      <Link onPress={() => navigateToPost(post.id)}>
        <HStack alignItems="center">
          <LinkText
            size="sm"
            fontFamily="$heading"
            fontWeight="$semibold"
            color={COLORS.PRIMARY}
            textDecorationLine="none"
          >
            Read
          </LinkText>
          <Icon
            as={ArrowRightIcon}
            size="sm"
            color={COLORS.PRIMARY}
            mt="$0.5"
            ml="$0.5"
          />
        </HStack>
      </Link>
    </GlueCard>
  );
}
