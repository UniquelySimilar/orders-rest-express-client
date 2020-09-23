<template>
    <input type="text" :id="componentId" :class="componentClass" v-model="inputNumber" v-on:input="filterDigits" />
</template>

<script>
    export default {
        data() {
            return {
                inputNumber: this.initialValue,
                previousValue: '',
            }
        },
        props: {
            numDigits: {
                type: Number,
                required: true
            },
            initialValue: {
                type: String,
                required: true
            },
            componentClass: {
                type: String,
                required: false
            },
            componentId: {
                type: String,
                required: false
            }
        },
        methods: {
            filterDigits(event) {
                // NOTE: This 'event' is and instance of 'InputEvent'
                let newValue = event.target.value;
                let isNum = /^\d+$/.test(newValue);
                if (newValue.length > this.numDigits) {
                    event.preventDefault();
                }
                else if (isNum) {
                    this.inputNumber = newValue;
                    this.previousValue = newValue;
                    this.$emit('updatePhone', this.inputNumber);
                }
                else {
                    // Edge case where 'previousValue' length is one and the 'backspace' key is pressed
                    if (this.previousValue.length == 1 && !event.data) {
                        this.previousValue = '';
                    }
                    this.inputNumber = this.previousValue;
                    event.preventDefault();
                    this.$emit('updatePhone', this.inputNumber);
                }
            }
        }
    }
</script>

<style scoped>

</style>
