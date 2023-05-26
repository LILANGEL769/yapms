import { get } from 'svelte/store';
import { RegionsStore } from './Regions';
import { SelectedCandidateStore } from '../Candidates';
import { InteractionStore } from '../Interaction';
import { EditRegionModalStore, SplitRegionModalStore } from '../Modals';

export function fillRegion(regionID: string, increment: boolean): void {
	const regions = get(RegionsStore);
	const region = regions.find((region) => region.id === regionID);
	if (region && !(region.disabled || region.locked)) {
		const currentInteractions = get(InteractionStore);
		const selectedCandidate = get(SelectedCandidateStore);
		const currentCandidate = region.candidates[0];
		const newCandidate = {
			candidate: selectedCandidate,
			count: region.value,
			margin: 0
		};
		if (currentCandidate.candidate.id === selectedCandidate.id && increment) {
			if (!currentInteractions.has('ControlLeft')) {
				//Increment
				newCandidate.margin =
					currentCandidate.margin + 1 >= selectedCandidate.margins.length
						? 0
						: currentCandidate.margin + 1;
			} else {
				//Decrement
				newCandidate.margin =
					currentCandidate.margin - 1 <= -1
						? selectedCandidate.margins.length - 1
						: currentCandidate.margin - 1;
			}
		}
		region.candidates = [newCandidate];
		RegionsStore.set(regions);
	}
}

export function splitRegion(regionID: string): void {
	const region = get(RegionsStore).find((region) => region.id === regionID);
	SplitRegionModalStore.set({
		region: region ?? null,
		open: region !== undefined
	});
}

export function editRegion(regionID: string): void {
	const region = get(RegionsStore).find((region) => region.id === regionID);
	EditRegionModalStore.set({
		region: region ?? null,
		open: region !== undefined
	});
}

export function disableRegion(regionID: string): void {
	const regions = get(RegionsStore);
	const region = regions.find((region) => region.id === regionID);
	if (region) {
		if (region?.disabled) {
			//Currently Disabled (Enable)
			region.disabled = false;
			//Set Region value back to OG value
			region.value = region.permaVal;
		} else {
			//Currently Enabled (Disable)
			region.disabled = true;
			//Set Region value to 0, save current val for when enabled again.
			region.value = 0;
		}
		RegionsStore.set(regions);
	}
}

export function lockRegion(regionID: string): void {
	const regions = get(RegionsStore);
	const region = regions.find((region) => region.id === regionID);
	if (region) {
		//Lock if unlocked, unlock if locked
		region.locked = !region.locked;
		RegionsStore.set(regions);
	}
}
