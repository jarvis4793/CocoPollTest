import { TextInput } from "react-native";

export type OptionData = {
    name: string
}

export const OptionInput = (props: any) => {

    return (
        <TextInput
            key={props.index}
            style={{ margin: 1, borderWidth: 1, }}
            placeholder="Option"
            maxLength={100}
            multiline={true}
            value={props.data[props.index]}
            onChangeText={val => {
                let newArray = [...props.data];
                newArray[props.index] = val
                props.setData(newArray);
                if (props.index == newArray.length - 1 && newArray.length != 10) {
                    newArray.push("")
                }
                console.log(props.data);
            }}
        />
    );
}