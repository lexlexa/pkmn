import { Flex } from "antd"
import { usePokeballForm } from "../../form"
import { FormInput } from "../../../../../../../../components/Form/components/Input/Input"


export const PokeballsGeneral = () => {
    const {
        values: { name, pokedexIndex },
        handlers: { setName, setPokedexIndex } } = usePokeballForm()

    return <Flex vertical gap={8}>
        <FormInput
            label="Название"
            onChange={setName}
            placeholder="Bulbasaur"
            value={name}
            required
        />
        <FormInput
            label="Номер в Pokedex"
            onChange={setPokedexIndex}
            value={pokedexIndex}
            required
        />
    </Flex>
}