<script lang="ts">
	interface TimeSlot {
		time: string;
		label: string;
		hour: number;
		minute?: number;
		totalMinutes?: number;
	}

	interface TimelineProps {
		timeSlots: TimeSlot[];
		isLive?: boolean;
		pixelsPerMinute?: number;
		showMinuteMarks?: boolean;
		startHour?: number;
		endHour?: number;
	}

	let {
		timeSlots,
		pixelsPerMinute = 2,
		showMinuteMarks = true,
		startHour = 8,
		endHour = 18
	}: TimelineProps = $props();

	// Helper function to determine if this is a main hour mark (minute = 0 or undefined)
	function isMainHour(slot: TimeSlot): boolean {
		return slot.minute === 0 || slot.minute === undefined;
	}

	// Calculate position of a time slot from the start of the timeline
	function getSlotPosition(slot: TimeSlot): number {
		const slotMinutes = slot.totalMinutes || slot.hour * 60 + (slot.minute || 0);
		const startMinutes = startHour * 60;
		const minutesFromStart = slotMinutes - startMinutes;
		return minutesFromStart * pixelsPerMinute;
	}

	// Calculate total timeline height
	const timelineHeight = (endHour - startHour) * 60 * pixelsPerMinute + 20;
</script>

<div class="bg-background w-80 border-r">
	<!-- Timeline Content with absolute positioning -->
	<div class="relative" style="height: {timelineHeight}px;  ">
		{#each timeSlots as slot}
			{@const position = getSlotPosition(slot)}
			{#if position >= 0}
				<div
					class="absolute flex w-full items-center text-sm"
					style="top: {position - 10}px; left: 20px; right: 20px;"
				>
					<!-- Main hour marks -->
					{#if isMainHour(slot)}
						<span class="w-14 font-medium text-gray-800">{slot.time}</span>
						<span class="ml-1 text-xs text-gray-500">{slot.label}</span>
						<div class="ml-4 h-3 w-3 flex-shrink-0 rounded-full bg-blue-500"></div>
						<div class="ml-2 h-px flex-1 bg-gray-300"></div>
					{:else if showMinuteMarks}
						<!-- Minute marks -->
						<span class="w-11 text-xs text-gray-400">{slot.time}</span>
						<div class="h-px flex-1 bg-gray-200"></div>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</div>
