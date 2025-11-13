import { PrismaClient } from "../generated/prisma/client.ts";
import "dotenv/config";
import { pokeballs } from "./pokebals-data.ts";

const prisma = new PrismaClient();

const data = [
    {
        "title": "Matte Ivory White",
        "code": "11100",
        "color": "#ffffff",
        "inStock": true,
        "id": "43a2b2be-5ae8-413d-954a-f4db46192a3b"
    },
    {
        "title": "Matte Bone White",
        "code": "11103",
        "color": "#CCC6B8",
        "inStock": true,
        "id": "26173222-0889-4751-b700-43806ff96dc9"
    },
    {
        "title": "Matte Lemon Yellow",
        "code": "11400",
        "color": "#F6D95C",
        "inStock": true,
        "id": "f6960f84-c06f-44df-ba88-9c6f1f638af9"
    },
    {
        "title": "Matte Mandarin Orange",
        "code": "11300",
        "color": "#F99A64",
        "inStock": true,
        "id": "1c5b0607-4c67-415d-83da-14d25d1eeff3"
    },
    {
        "title": "Matte Sakura Pink",
        "code": "11201",
        "color": "#E8B1D0",
        "inStock": true,
        "id": "21caecbb-0931-45f4-9fa2-e23131255fbe"
    },
    {
        "title": "Matte Lilac Purple",
        "code": "11700",
        "color": "#AE96D4",
        "inStock": true,
        "id": "5d74fc89-3fe1-4361-b0d0-7f456c762c67"
    },
    {
        "title": "Matte Plum",
        "code": "11204",
        "color": "#950051",
        "inStock": true,
        "id": "76286117-04ee-4881-b3c3-3be76d412377"
    },
    {
        "title": "Matte Scarlet Red",
        "code": "11200",
        "color": "#E26767",
        "inStock": true,
        "id": "910500ed-f459-4917-ac12-a83ecda29dca"
    },
    {
        "title": "Matte Dark Red",
        "code": "11202",
        "color": "#BB3C43",
        "inStock": false,
        "id": "d3ad369e-970a-4e93-b737-b4045bd4fa7c"
    },
    {
        "title": "Matte Apple Green",
        "code": "11502",
        "color": "#C3E189",
        "inStock": true,
        "id": "614137b8-f28e-4970-bd9e-4dc989cfe655"
    },
    {
        "title": "Matte Grass Green",
        "code": "11500",
        "color": "#61C680",
        "inStock": true,
        "id": "c70d68a6-7a0a-408f-8333-e39c363604bc"
    },
    {
        "title": "Matte Dark Green",
        "code": "11501",
        "color": "#68724D",
        "inStock": true,
        "id": "825817bc-d298-43a0-9914-10a34ba81189"
    },
    {
        "title": "Matte Ice Blue",
        "code": "11601",
        "color": "#A3D8E0",
        "inStock": true,
        "id": "02453d58-838d-44c0-87af-63d9aa1499cc"
    },
    {
        "title": "Matte Sky Blue",
        "code": "11603",
        "color": "#56B6E6",
        "inStock": true,
        "id": "5375fb67-cbb2-4df9-b2fc-06addd6c55e3"
    },
    {
        "title": "Matte Marine Blue",
        "code": "11600",
        "color": "#1281C3",
        "inStock": true,
        "id": "6f4c85d0-d0dd-4e11-9746-777ab569c7a5"
    },
    {
        "title": "Matte Dark Blue",
        "code": "11602",
        "color": "#043057",
        "inStock": true,
        "id": "87ca9a6a-2d2d-4dfd-a49a-39c7b93370b3"
    },
    {
        "title": "Matte Desert Tan",
        "code": "11401",
        "color": "#E8DBB8",
        "inStock": true,
        "id": "c035b65f-f2ee-456b-9b12-ca35b380d741"
    },
    {
        "title": "Matte Latte Brown",
        "code": "11800",
        "color": "#D3B8A7",
        "inStock": true,
        "id": "0478f5c7-36fd-43e7-9a75-6980e6b20929"
    },
    {
        "title": "Matte Caramel",
        "code": "11803",
        "color": "#AE825B",
        "inStock": true,
        "id": "2808a841-2ae5-4718-bc4c-d3b58766ef84"
    },
    {
        "title": "Matte Terracotta",
        "code": "11203",
        "color": "#B25533",
        "inStock": true,
        "id": "49aa34c5-b1bd-4167-b79e-0065c7f0f60b"
    },
    {
        "title": "Matte Dark Brown",
        "code": "11801",
        "color": "#7C6555",
        "inStock": true,
        "id": "6deb8254-1635-47d1-ba7a-c5b1f45a593f"
    },
    {
        "title": "Matte Dark Chocolate",
        "code": "11802",
        "color": "#4D3324",
        "inStock": false,
        "id": "6ddfdf16-51d3-4145-b1b3-06a2df763771"
    },
    {
        "title": "Matte Ash Grey",
        "code": "11102",
        "color": "#9A9EA1",
        "inStock": true,
        "id": "8efb4853-422f-43da-8b94-340c235dead9"
    },
    {
        "title": "Matte Nardo Gray",
        "code": "11104",
        "color": "#757575",
        "inStock": false,
        "id": "9c09bec0-b74e-4b78-9437-b11a3f2dd612"
    },
    {
        "title": "Matte Charcoal",
        "code": "11101",
        "color": "#000000",
        "inStock": true,
        "id": "6e99a57a-40f5-4c08-a149-c461f19ece44"
    },
    {
        "title": "Basic Jade White",
        "code": "10100",
        "color": "#ffffff",
        "inStock": false,
        "id": "c065f516-a327-4112-967b-bbcd86f39f4b"
    },
    {
        "title": "Basic Beige",
        "code": "10201",
        "color": "#f7e6de",
        "inStock": false,
        "id": "9f2d6d1f-2524-430f-919e-b3ba49a95096"
    },
    {
        "title": "Basic Light Gray",
        "code": "10104",
        "color": "#d1d3d5",
        "inStock": false,
        "id": "3247926c-f1d8-496f-870f-272ea2b4c4c8"
    },
    {
        "title": "Basic Yellow",
        "code": "10400",
        "color": "#f4ee2a",
        "inStock": false,
        "id": "b97d877a-83a8-401a-a8ba-8fc9b5879817"
    },
    {
        "title": "Basic Sunflower Yellow",
        "code": "10402",
        "color": "#fec601",
        "inStock": true,
        "id": "71d68bc2-2413-4a79-b403-be5ca12ea514"
    },
    {
        "title": "Basic Pumpkin Orange",
        "code": "10301",
        "color": "#ff8e16",
        "inStock": false,
        "id": "41b3e304-e987-4b29-8d54-a200feb30c6e"
    },
    {
        "title": "Basic Orange",
        "code": "10300",
        "color": "#ff6a13",
        "inStock": true,
        "id": "d164e14e-226c-4d8d-b3aa-f06c642c5a98"
    },
    {
        "title": "Basic Gold",
        "code": "10401",
        "color": "#e4bd68",
        "inStock": true,
        "id": "716a74bd-ef7d-492f-94ce-1fb47717dfeb"
    },
    {
        "title": "Basic Bright Green",
        "code": "10503",
        "color": "#bdcf00",
        "inStock": false,
        "id": "bee1c6f8-e3c3-4472-bcd8-da1f5532ca07"
    },
    {
        "title": "Basic Bambu Green",
        "code": "10501",
        "color": "#16c344",
        "inStock": true,
        "id": "7a9a1f43-8096-4b5e-8215-822c4f9d8148"
    },
    {
        "title": "Basic Mistletoe Green",
        "code": "10502",
        "color": "#3f8e43",
        "inStock": true,
        "id": "d62573e1-b3bd-4001-a2bc-b2700f2c314b"
    },
    {
        "title": "Basic Pink",
        "code": "10203",
        "color": "#f55a74",
        "inStock": true,
        "id": "5472dc33-d8e5-4a93-bff7-79a5a31219ff"
    },
    {
        "title": "Basic Hot Pink",
        "code": "10204",
        "color": "#f5547d",
        "inStock": true,
        "id": "fb9786f7-ef43-4e49-84b0-f5863b0e7d7e"
    },
    {
        "title": "Basic Magenta",
        "code": "10202",
        "color": "#ec008c",
        "inStock": false,
        "id": "e82485c6-ffcd-4b5d-9b5a-8438726aef53"
    },
    {
        "title": "Basic Red",
        "code": "10200",
        "color": "#c12e1f",
        "inStock": true,
        "id": "e7db7e6f-4881-4642-9b9c-b59e3a522abc"
    },
    {
        "title": "Basic Maroon Red",
        "code": "10205",
        "color": "#9d2235",
        "inStock": false,
        "id": "cca1d42c-3c59-49c8-928b-336ee4de367e"
    },
    {
        "title": "Basic Purple",
        "code": "10700",
        "color": "#5e43b7",
        "inStock": true,
        "id": "2bd877aa-7770-4c33-bd92-a6a534ac7f66"
    },
    {
        "title": "Basic Indigo Purple",
        "code": "10701",
        "color": "#482a60",
        "inStock": true,
        "id": "92292a8c-81cd-48df-b674-77add67d62e8"
    },
    {
        "title": "Basic Turquoise",
        "code": "10605",
        "color": "#00b1b7",
        "inStock": false,
        "id": "8864e56c-df15-4d0e-bec1-efd401bc5c44"
    },
    {
        "title": "Basic Cyan",
        "code": "10603",
        "color": "#0086d6",
        "inStock": false,
        "id": "8605a362-aa7c-4de7-8707-e398c64e9e77"
    },
    {
        "title": "Basic Cobalt Blue",
        "code": "10604",
        "color": "#0055b8",
        "inStock": false,
        "id": "a75bbe3b-33e9-4b89-94d4-c9c70416b671"
    },
    {
        "title": "Basic Blue",
        "code": "10601",
        "color": "#0a2989",
        "inStock": false,
        "id": "90c0e834-dd9f-45f3-aaac-df83e0f7b422"
    },
    {
        "title": "Basic Brown",
        "code": "10800",
        "color": "#9d432c",
        "inStock": true,
        "id": "42914c02-2456-4d73-ac52-74e3e6885687"
    },
    {
        "title": "Basic Cocoa Brown",
        "code": "10802",
        "color": "#6f5034",
        "inStock": false,
        "id": "dd44ce97-b32d-428f-b621-344f067a2411"
    },
    {
        "title": "Basic Bronze",
        "code": "10801",
        "color": "#847d48",
        "inStock": false,
        "id": "b04aa5f0-5284-4ea3-9291-b1aa895c1ab4"
    },
    {
        "title": "Basic Gray",
        "code": "10103",
        "color": "#8e9089",
        "inStock": false,
        "id": "d6070275-7571-41b0-b87e-6c6c22dc5f2b"
    },
    {
        "title": "Basic Silver",
        "code": "10102",
        "color": "#a6a9aa",
        "inStock": true,
        "id": "18cd229a-a185-4fa7-b471-0d8b11e7a6bf"
    },
    {
        "title": "Basic Blue Grey",
        "code": "10602",
        "color": "#5b6579",
        "inStock": true,
        "id": "b4c161f3-9f58-41c5-bd82-715ce8f001de"
    },
    {
        "title": "Basic Dark Gray",
        "code": "10105",
        "color": "#545454",
        "inStock": false,
        "id": "681268c7-0385-4995-b2ea-94a885e44d14"
    },
    {
        "title": "Basic Black",
        "code": "10101",
        "color": "#000000",
        "inStock": true,
        "id": "e4faa8bc-0ab6-4b68-aee4-24a526777a03"
    },
]

async function main() {
    console.log(`Start seeding ...`);

    // Для удобства перезапуска сида, сначала удалим старые данные
    // Порядок важен из-за внешних ключей: сначала дочерние, потом родительские
    await prisma.filaments.deleteMany();
    await prisma.filament_types.deleteMany();
    await prisma.filament_brands.deleteMany();

    console.log('Old data deleted.');

    // Создаем бренд
    const bambuLab = await prisma.filament_brands.create({
        data: {
            name: 'BambuLab',
        },
    });

    // Создаем тип, связанный с этим брендом
    const plaMatte = await prisma.filament_types.create({
        data: {
            name: 'PLA Matte',
            brand_id: bambuLab.id, // Связываем с созданным брендом eSUN
        },
    });

    const plaBasic = await prisma.filament_types.create({
        data: {
            name: 'PLA Basic',
            brand_id: bambuLab.id, // Связываем с созданным брендом eSUN
        },
    });

    const plaBasicGradient = await prisma.filament_types.create({
        data: {
            name: 'PLA Basic Gradient',
            brand_id: bambuLab.id, // Связываем с созданным брендом eSUN
        },
    });


    const oceanToMeadow = await prisma.filaments.create({
        data: {
            name: 'Ocean to Meadow',
            type_id: plaBasicGradient.id
        }
    })



    for (let item of data) {
        await prisma.filaments.create({
            data: {
                name: item.title.split(' ').slice(1).join(' '),
                code: item.code,
                color: item.color,
                in_stock: item.inStock,
                type_id: item.title.includes('Matte') ? plaMatte.id : plaBasic.id, // Связываем с созданным типом PLA+
            },
        });
    }


    // TODO: DEV

    const category = await prisma.items_categories.create({
        data: {
            name: 'Покеболы',
            slug: 'pokeballs'
        }
    })

    const legacyNameById: Record<string, string> = {
        ...data.reduce((acc: Record<string, string>, curr) => ({ ...acc, [curr.id]: curr.title }), {}),
        '98aee7ae-bf8a-47b5-a18a-0602397f55b1': "PLA Basic Gradient - Ocean to Meadow"
    }
    const newFilaments = await prisma.filaments.findMany();
    const newFilamentsIdByName = newFilaments.reduce((acc: Record<string, number>, curr) => ({ ...acc, [curr.name]: curr.id }), {})

    for (let pokeball of pokeballs) {
        const item = await prisma.items.create({
            data: {
                name: pokeball.name,
                category_id: category.id,
                price: Number(pokeball.price),
            }
        })

        await prisma.items_images.createMany({ data: pokeball.images.map(img => ({ image_id: img.replace('.png', ''), item_id: item.id })) })

        await prisma.items_filament.createMany({
            data: pokeball.filament.map(fil => {
                const filName = legacyNameById[fil.id]


                const clearedFilName = filName.replace('PLA Basic Gradient - ', '').replace("Basic ", '').replace('Matte ', '')
                const newFilId = filName === 'Ocean to Meadow' ? oceanToMeadow.id : newFilamentsIdByName[clearedFilName]
                console.log(fil.id, clearedFilName, newFilId)
                return {
                    item_id: item.id,
                    filament_id: newFilId,
                    count: Math.ceil(Number(fil.count))
                }
            })
        })

    }

    // await pokeballs.forEach(() => {

    // })

    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });