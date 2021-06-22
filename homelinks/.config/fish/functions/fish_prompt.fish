function fish_prompt --description 'Write out the prompt'

	set -l last_status $status

	if not set -q __fish_prompt_normal
		set -g __fish_prompt_normal (set_color normal)
	end

	# Emoji
	# printf "$my_emoji  "

	# User
	set_color $fish_color_user
	printf (hostname)
	printf " "
	set_color normal

	# PWD
	set_color $fish_color_cwd
	printf (prompt_pwd)
	set_color normal

	printf '%s ' (__fish_git_prompt | sed s/[\)\(]//g)

	if set -q KUBECONFIG
		set_color red
		echo -en (basename $KUBECONFIG)
		echo -en " "
	end

	if not test $last_status -eq 0
		set_color $fish_color_error
	else
		set_color $fish_color_command
	end

	printf '▶ '

end
