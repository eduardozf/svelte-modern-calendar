<script lang="ts">
	import Calendar from 'lucide-svelte/icons/calendar';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import Plus from 'lucide-svelte/icons/plus';
	import { Tabs, TabsList, TabsTrigger } from '../ui/tabs/index.js';
	import { Button } from '../ui/button/index.js';

	interface CalendarHeaderProps {
		currentDate: string;
		eventsCount: number;
		selectedTab?: string;
		onPrevious?: () => void;
		onNext?: () => void;
		onToday?: () => void;
		onNewEvent?: () => void;
	}

	let {
		currentDate,
		eventsCount,
		selectedTab = 'Week',
		onPrevious,
		onNext,
		onToday,
		onNewEvent
	}: CalendarHeaderProps = $props();
</script>

<div class="border-b border-gray-200 bg-white px-6 py-4">
	<div class="flex items-center justify-between">
		<!-- Date Navigation -->
		<div class="flex items-center gap-4">
			<div class="flex items-center gap-2">
				<Button variant="ghost" class="text-sm font-medium" size="icon" onclick={onPrevious}>
					<ChevronLeft class="size-4" />
				</Button>
				<Button variant="ghost" class="text-sm font-medium" onclick={onToday}>Today</Button>
				<Button variant="ghost" class="text-sm font-medium" size="icon" onclick={onNext}>
					<ChevronRight class="size-4" />
				</Button>
			</div>

			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
					<Calendar class="size-6 text-white" />
				</div>
				<div>
					<h1 class="text-xl font-semibold text-gray-900">{currentDate}</h1>
					<p class="text-sm text-gray-500">{eventsCount} events scheduled</p>
				</div>
			</div>
		</div>

		<!-- Right side buttons -->
		<div class="flex items-center gap-3">
			<Button class="flex gap-2 bg-blue-500 text-white hover:bg-blue-600" onclick={onNewEvent}>
				<Plus class="size-4" />
				New Event
			</Button>

			<Tabs bind:value={selectedTab} class="ml-4">
				<TabsList class="bg-gray-100">
					<TabsTrigger value="Day">Day</TabsTrigger>
					<TabsTrigger value="Month">Month</TabsTrigger>
					<TabsTrigger value="Week">Week</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	</div>
</div>
