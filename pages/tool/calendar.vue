<template>
	<view class="uni-page-body">
		<view class="uni-text" style="font-size: 32upx;color: #666;padding: 20upx;">
			 <uni-calendar 
			    :insert="true"
			    :lunar="true" 
			    :start-date="'2000-1-1'"
			    :end-date="'2090-12-30'"
			    @change="change"
			 ></uni-calendar>
		</view>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
	    components: {
	        uniCalendar
	    },
	    data() {
	        return {};
	    },
	    methods: {
	        change(e) {
	            console.log(e);
	        }
	    }
	};
</script>

<style>
</style>
