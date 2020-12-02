<template>
    <aside class="controls">
        <button @click="shuffle">重新开始</button>
    </aside>
    <div class="desk" ref="desk">
        <template v-for="i in 4">
            <li
                class="card"
                :class="{
                    back: (!item.show),
                    dragon: item.id > 0 && item.show,
                    tiger: item.id < 0 && item.show,
                    active: activeCard.id === item.id
                }"
                v-for="(item, j) in dock[i - 1]"
                :key="item.id"
                @click="showCard(item, [i - 1, j])"
            >
                {{ item.show ? item.label : '' }}
            </li>
        </template>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { Sortable } from 'sortablejs'
export default {
    name: 'TigerDragons',
    props: {},
    setup() {
        const dragons = [{
                label: '龙1',
                show: false,
                died: false,
                id: 1
            }, {
                label: '龙2',
                show: false,
                died: false,
                id: 2
            }, {
                label: '龙3',
                show: false,
                died: false,
                id: 3
            }, {
                label: '龙4',
                show: false,
                died: false,
                id: 4
            },{
                label: '龙5',
                show: false,
                died: false,
                id: 5
            }, {
                label: '龙6',
                show: false,
                died: false,
                id: 6
            },{
                label: '龙7',
                show: false,
                died: false,
                id: 7
            }, {
                label: '龙8',
                show: false,
                died: false,
                id: 8
            },
        ]
        const tigers = [{
                label: '虎1',
                show: false,
                died: false,
                id: -1
            }, {
                label: '虎2',
                show: false,
                died: false,
                id: -2
            }, {
                label: '虎3',
                show: false,
                died: false,
                id: -3
            }, {
                label: '虎4',
                show: false,
                died: false,
                id: -4
            },{
                label: '虎5',
                show: false,
                died: false,
                id: -5
            }, {
                label: '虎6',
                show: false,
                died: false,
                id: -6
            },{
                label: '虎7',
                show: false,
                died: false,
                id: -7
            }, {
                label: '虎8',
                show: false,
                died: false,
                id: -8
            },
        ]
        const desk = ref(null)
        onMounted(() => {
            // new Sortable(desk.value, {
            //     animation: 150,
            //     ghostClass: 'blue-background-class'
            // });
        })
        let activeCard = ref({})
        let dock = ref([])
        const shuffle = () => {
            const list = [...dragons.map(a => ({...a})), ...tigers.map(a => ({...a}))]
                .sort((a, b) => (Math.random() > 0.5 ? -1 : 1))
            dock.value = [
                list.slice(0, 4),
                list.slice(4, 8),
                list.slice(8, 12),
                list.slice(12, 16)
            ]
        }
        const eat = (item, position) => {
            const [i, j] = position
            const [ai, aj] = activeCard.value.position
            const reachable = [
                String([i, j+1]),
                String([i, j-1]),
                String([i+1, j]),
                String([i-1, j])
            ].includes(String([ai, aj]))
            if (!reachable) return
            const activeId = activeCard.value.id
            const activeIdAbs = Math.abs(activeId)
            const id = item.id || 0
            const idAbs = Math.abs(id)
            const movable = (activeIdAbs === 8 && idAbs === 1) || activeIdAbs <= idAbs || !idAbs
            const sameRace = activeId * id > 0
            if (movable && !sameRace) {
                dock.value[i][j] = idAbs === activeIdAbs ? { show: true } : dock.value[ai][aj]
                dock.value[ai][aj] = { show: true }
                activeCard.value = {}
            }
        }
        const showCard = (item, position) => {
            if(!item.show) {
                item.show = true
            }
            else if(!activeCard.value.id) {
                activeCard.value = {
                    id: item.id,
                    position
                }
            } else if(activeCard.value.id === item.id) {
                activeCard.value = {}
            } else {
                eat(item, position)
            }
        }
        shuffle()
        return {
            desk,
            dock,
            shuffle,
            showCard,
            activeCard
        };
    }
};
</script>

<style scoped>
.controls {
    float: left;
}
li {
    list-style: none;
}
.desk {
    float: left;
    display: flex;
    flex-wrap: wrap;
    width: 600px;
}
.card {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 150px;
    height: 150px;
    border: 1px solid black;
    /* color: blue; */
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
}
.back {
    background: lightblue;
}
.dragon {
}
.tiger {
}
.active {
    color: blue;
}
</style>