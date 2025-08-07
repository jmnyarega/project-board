import { FC, ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

type Props = {
    id: string;
    children: ReactNode
}

const Droppable: FC<Props> = (props) => {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        opacity: isOver ? 1 : 0.5,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}

export default Droppable;
