import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
} from '@gluestack-ui/themed';

interface ActionSheetItemProps {
  onPress: () => void;
  text: string;
}

export function ActionSheetItem({ onPress, text }: ActionSheetItemProps) {
  return (
    <ActionsheetItem onPress={onPress}>
      <ActionsheetItemText>{text}</ActionsheetItemText>
    </ActionsheetItem>
  );
}

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export function ActionSheet({ isOpen, onClose, children }: ActionSheetProps) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent h="$72" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {children}
      </ActionsheetContent>
    </Actionsheet>
  );
}
