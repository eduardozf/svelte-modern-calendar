<script lang="ts">
	import { Calendar } from '$lib/components/calendar/index.js';
	import { eventsMock } from '$lib/mock/events.js';

	let currentPixelsPerMinute = 2;
</script>

<div class="min-h-screen bg-gray-50">
	<Calendar
		events={eventsMock}
		currentDate="Tuesday, March 31"
		pixelsPerMinute={currentPixelsPerMinute}
		startHour={8}
		endHour={18}
	/>
</div>
