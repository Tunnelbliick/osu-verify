const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Configure bot verification settings')
        .addBooleanOption(option =>
            option.setName('skip_verified')
                .setDescription('Skip verification for already verified users')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('update_username')
                .setDescription('Update username to osu! username')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('verification_role')
                .setDescription('Role to assign after verification')
                .setRequired(true)),
    
    async execute(interaction) {
        const skipVerified = interaction.options.getBoolean('skip_verified');
        const updateUsername = interaction.options.getBoolean('update_username');
        const verificationRole = interaction.options.getRole('verification_role');

        // Save the settings (e.g., in a database or in-memory config)
        const settings = {
            skipVerified,
            updateUsername,
            verificationRoleId: verificationRole.id
        };

        // You could store `settings` in your database here.

        await interaction.reply({
            content: `Setup completed! Here's what you chose:
- Skip verification for already verified users: **${skipVerified ? 'Yes' : 'No'}**
- Update username to osu! username: **${updateUsername ? 'Yes' : 'No'}**
- Role to assign after verification: **${verificationRole.name}**`,
            ephemeral: true
        });
    }
};
