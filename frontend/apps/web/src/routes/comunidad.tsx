// Comunidad / Marketplace — placeholder con el feed de posts del store.
import { postKindLabels, useAppStore } from '@suculentapp/core'
import { Badge, Card, Icon, ScreenContainer, Text, XStack, YStack } from '@suculentapp/ui'

export function Comunidad() {
  const posts = useAppStore((s) => s.posts)
  const toggleLike = useAppStore((s) => s.toggleLike)

  return (
    <ScreenContainer>
      <Text variant="title">Comunidad</Text>

      {posts.map((post) => (
        <Card key={post.id} gap="$3">
          <XStack alignItems="center" gap="$2">
            <YStack
              width={40}
              height={40}
              borderRadius={9999}
              backgroundColor="$terra300"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="$terra700" fontWeight="700">
                {post.userName[0]}
              </Text>
            </YStack>
            <YStack flex={1}>
              <Text fontWeight="700" fontSize="$4">
                {post.userName}
              </Text>
              <Text variant="caption">{post.userLocation}</Text>
            </YStack>
            <Badge tone="sage">{postKindLabels[post.kind]}</Badge>
          </XStack>

          <XStack alignItems="center" justifyContent="space-between" gap="$2">
            <Text fontWeight="700" fontSize="$5" flex={1}>
              {post.title}
            </Text>
            {post.price != null ? (
              <Text color="$terra700" fontWeight="700" fontSize="$6">
                ${post.price}
              </Text>
            ) : null}
          </XStack>

          <Text variant="body" color="$sage700">
            {post.content}
          </Text>

          <XStack alignItems="center" gap="$4">
            <XStack
              alignItems="center"
              gap="$1"
              cursor="pointer"
              hoverStyle={{ opacity: 0.7 }}
              onPress={() => toggleLike(post.id)}
            >
              <Icon name="heart" size={16} color="$accent" fill />
              <Text variant="caption">{post.likesCount}</Text>
            </XStack>
            <XStack alignItems="center" gap="$1">
              <Icon name="message-circle" size={16} color="$muted" />
              <Text variant="caption">{post.repliesCount}</Text>
            </XStack>
          </XStack>
        </Card>
      ))}
    </ScreenContainer>
  )
}
