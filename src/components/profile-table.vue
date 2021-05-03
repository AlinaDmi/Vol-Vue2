<template>
    <div>
        <!-- <div>
            <b-table striped hover :items="personalOrders" :fields="fields"></b-table>
        </div> -->
        <h4 class="my-4">Принятые заказы</h4>
        <b-table
                show-empty
                hover
                stacked="md"
                :items="personalOrders"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
        >
        <template #cell(actions)="environment">
            <b-btn size="sm" @click="log(environment.item)">Details</b-btn>
        </template>
            <!-- <template slot="id" slot-scope="row">
                {{ row.item.id_ord }}
            </template>

            <template slot="date" slot-scope="row">
                {{ row.item.date_start }}
            </template>

            <template slot="title" slot-scope="row">
                {{ row.item.name }}
            </template> -->
        </b-table>

        <b-row>
            <b-col md="6" class="my-1">
                <b-pagination
                        :total-rows="totalRows"
                        :per-page="perPage"
                        v-model="currentPage"
                        class="my-0"
                />
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                // fields: ['name', 'ordstatus'],
                // personalOrders:[],
                fields: [
                    { key: 'name', label: 'Title', class: 'text-center'},
                    { key: 'date_start', label: 'Date', class: 'text-center'},
                    { key: 'ordstatus', label: 'Status', class: 'text-center'},
                    { key: 'actions', label: 'Подробнее', class: 'text-center'}
                ],
                currentPage: 1,
                perPage: 5,
                //totalRows: personalOrders.length,
                pageOptions: [5, 10, 15]
            }
        },
       computed:{
        ...mapState([
            'personalOrders'
        ]),
        totalRows(){
            return this.personalOrders.length
        }
      },
      methods: {
        myRowClickHandler(record, index) {
            // 'record' will be the row data from items
            // `index` will be the visible row number (available in the v-model 'shownItems')
            log(record); // This will be the item data for the row
        }
        }
        
    }
</script>