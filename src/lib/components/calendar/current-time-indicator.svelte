<script lang="ts">
	interface CurrentTimeIndicatorProps {
		currentTime: string;
		timeLinePosition: number; // Position in pixels from top
	}

	let { currentTime, timeLinePosition }: CurrentTimeIndicatorProps = $props();
</script>

<!-- Current time line indicator -->
<div class="absolute right-0 left-0 z-[999]" style="top: {timeLinePosition}px;">
	<div class="flex items-center">
		<div class="h-3 w-3 rounded-full bg-red-500"></div>
		<div class="h-px flex-1 bg-red-500"></div>
	</div>
</div>

<!-- Current Time Display -->
<div class="fixed right-4 bottom-4 z-[1000] rounded-lg border bg-white p-4 shadow-sm">
	<div class="mb-1 text-sm text-gray-600">Current</div>
	<div class="text-lg font-semibold text-gray-900">{currentTime}</div>
</div>
