import {AbilityBuilder, Ability} from '@casl/ability';

export default function defineAbilityFor(user) {
    const {can, rules} = new AbilityBuilder(Ability);

    // default fields access for all users
    can('read', 'Task');
    can('update', 'Task', ['name', 'description', 'duration', 'due_date']);

    if (user.accessSpecs) {
        // enable for each specified access requirement
        // TODO:// can be optimized
        user.accessSpecs.forEach(accessSpec => {
            const {action, model, fieldsList} = accessSpec;
            can(action, model, fieldsList);
        });
    }

    return new Ability(rules);
}
