<script lang="ts">
	import User from 'lucide-svelte/icons/user';
	import Users from 'lucide-svelte/icons/users';
	import { cn } from '$lib/utils.js';
	import { Button } from '../ui/button/index.js';

	interface EventCardProps {
		event: CalendarEvent;
		style?: string;
		onClick?: (event: CalendarEvent) => void;
	}

	let { event, style = '', onClick }: EventCardProps = $props();

	function handleClick() {
		if (onClick) {
			onClick(event);
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick();
		}
	}

	function lightenHexColor(hex: string, amount: number) {
		return (
			'#' +
			hex
				.replace(/^#/, '')
				.match(/.{2}/g)
				?.map((color) => {
					const value = parseInt(color, 16);
					const newValue = Math.max(0, Math.min(255, value + amount));
					return newValue.toString(16).padStart(2, '0');
				})
				.join('')
		);
	}
</script>

<div
	class={cn(
		'absolute flex cursor-pointer flex-col rounded-lg px-3 py-1 text-white shadow-sm transition-shadow hover:shadow-md'
	)}
	style={`
		${style}
		background-color: ${event.colorHex};
		background-image: linear-gradient(160deg, ${lightenHexColor(event.colorHex!, 20)}, ${event.colorHex});
		background-blend-mode: normal;
		opacity: 1;`}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	role="button"
	tabindex="0"
>
	<div class="relative z-20 mb-1 flex items-start justify-between">
		<h3 class="text-sm leading-tight font-medium">{event.title}</h3>
		<div class="flex items-center gap-1">
			{#if event.isNow}
				<span class="rounded-full bg-white/20 px-2 py-0.5 text-xs">Now</span>
			{/if}
			<Button variant="ghost" size="icon" class="text-white/70 hover:text-white">
				<User class="size-4" />
			</Button>
		</div>
	</div>
	<p class="relative z-20 text-xs opacity-90">{event.startTime} - {event.endTime}</p>

	<div class="relative z-20 mt-2 flex items-center justify-between">
		{#if event.avatar}
			<div
				class="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-medium"
			>
				{event.avatar}
			</div>
		{/if}
		{#if event.participants}
			<div class="flex items-center gap-1 text-xs">
				<Users class="size-3" />
				+{event.participants}
			</div>
		{/if}
	</div>
</div>
